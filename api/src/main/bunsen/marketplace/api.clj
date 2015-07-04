(ns bunsen.marketplace.api
  (:require [clojure.set :as set]
            [bunsen.marketplace.model.tag :as tag]
            [bunsen.marketplace.model.index :as index]
            [bunsen.marketplace.model.vendor :as vendor]
            [bunsen.marketplace.model.format :as format]
            [bunsen.marketplace.model.rating :as rating]
            [bunsen.marketplace.model.catalog :as catalog]
            [bunsen.marketplace.model.dataset :as dataset]
            [bunsen.marketplace.model.category :as category]
            [bunsen.marketplace.model.subscription :as subscription]))

(defn- merge-average-ratings-for-datasets
  [datomic-db index-name datasets]
  (update-in
    datasets [:data] (partial
                       map #(merge
                              % (rating/get-average-rating
                                         datomic-db index-name (:id %))))))

(defn- ->vendor
  [vendor]
  {:id (:vendor/public-id vendor)
   :name (:vendor/name vendor)})

(defn- find-and-transform-vendor
  [datomic-db vendor-id]
  (->> vendor-id
       (vendor/find-vendor datomic-db)
       ->vendor))

(defn- assoc-dataset-vendor
  [datomic-db dataset]
  (update-in dataset [:vendor] (partial find-and-transform-vendor datomic-db)))

(defn- assoc-dataset-vendors
  [datomic-db datasets]
  (update-in datasets [:data] (partial mapv (partial assoc-dataset-vendor datomic-db))))

(defn- assoc-dataset-filter-vendors
  [datomic-db datasets]
  (-> datasets
      (update-in [:filters :vendor] (partial mapv (partial find-and-transform-vendor datomic-db)))
      (update-in [:filters :vendor] (partial sort-by :name))))

(defn find-datasets
  [datomic-db es-conn catalog-id query]
  (let [catalog (catalog/get-catalog datomic-db catalog-id)
        index-name (:catalog/name catalog)]
    (->> catalog
         (dataset/find-datasets es-conn catalog-id query)
         (merge-average-ratings-for-datasets datomic-db index-name)
         (assoc-dataset-vendors datomic-db)
         (assoc-dataset-filter-vendors datomic-db))))

(defn get-dataset
  [datomic-db es-conn catalog-id dataset-id]
  (let [catalog (catalog/get-catalog datomic-db catalog-id)
        index-name (:catalog/name catalog)
        dataset (assoc-dataset-vendor datomic-db
                                      (dataset/get-dataset es-conn index-name dataset-id))
        category (category/find-category datomic-db (:categoryId dataset))
        related (->> (dataset/find-datasets
                       es-conn catalog-id {:from 0
                                           :size 5
                                           :exclude dataset-id
                                           :tags (:tags dataset)
                                           :category-id (str (:marketplace.category/public-id category))} catalog)
                     (merge-average-ratings-for-datasets datomic-db index-name)
                     :data)
        subscriber-ids (subscription/find-subscription-user-ids-by-dataset-id
                         datomic-db index-name dataset-id)]
    (assoc dataset
           :index index-name
           :catalog catalog
           :subscriberIds subscriber-ids
           :category category
           :related related)))

(defn- get-parent-category-ids
  [datomic-db category-id]
  (loop [category (category/find-category datomic-db category-id)
         ids [category-id]]
    (if-not (:marketplace.category/parent category)
      ids
      (recur (category/find-category datomic-db (str (get-in category [:marketplace.category/parent :marketplace.category/public-id])))
             (conj ids (str (get-in category [:marketplace.category/parent :marketplace.category/public-id])))))))

(defn- assoc-dataset-count
  [es-conn categories]
  (mapv #(assoc % :count (dataset/count-by-category es-conn %))
        categories))

(defn refresh-index!
  [es-conn index-name]
  (index/refresh-index! es-conn index-name))

(defn- update-category-counts!
  [conn es-conn]
  (let [categories (category/list-all-categories conn)
        categories (assoc-dataset-count es-conn categories)]
    (doseq [category categories]
      (category/update-category!
        conn
        {:category-id (str (:marketplace.category/public-id category))
         :count (:count category)}))))

(defn create-dataset!
  [datomic-db datomic-conn es-conn catalog-id dataset]
  (let [catalog (catalog/get-catalog datomic-db catalog-id)
        index-name (:catalog/name catalog)
        category-ids (get-parent-category-ids datomic-db (:categoryId dataset))
        dataset (assoc dataset :categoryIds category-ids
                               :catalog (:catalog-id dataset))
        dataset (dissoc dataset :category :catalog-id)
        created-dataset (dataset/create-dataset! es-conn index-name dataset)]
    (future
      (refresh-index! es-conn "*")
      (update-category-counts! datomic-conn es-conn))
    created-dataset))

(defn update-dataset!
  [datomic-db datomic-conn es-conn catalog-id dataset-id dataset]
  (let [catalog (catalog/get-catalog datomic-db catalog-id)
        category-ids (get-parent-category-ids datomic-db (:categoryId dataset))
        dataset (assoc dataset :catalog catalog-id
                               :categoryIds category-ids)
        updated-dataset (dataset/update-dataset!
                           es-conn (:catalog/name catalog) dataset-id (dissoc dataset :index :subscriberIds :related :category :dataset-id :category-id))]
    (future
      (refresh-index! es-conn "*")
      (update-category-counts! datomic-conn es-conn))
    updated-dataset))

(defn retract-dataset!
  [datomic-db datomic-conn es-conn catalog-id dataset-id]
  (let [catalog (catalog/get-catalog datomic-db catalog-id)
        result (dataset/retract-dataset! es-conn (:catalog/name catalog) dataset-id)]
    (future
      (refresh-index! es-conn "*")
      (update-category-counts! datomic-conn es-conn))
    result))

(defn create-datasets!
  [es-conn index-name datasets]
  (->> (category/list-categories es-conn index-name)
       (dataset/create-datasets! es-conn index-name datasets)))

(defn update-dataset-mappings!
  [es-conn index-name]
  (->> (category/list-categories es-conn index-name)
       (dataset/update-dataset-mappings! es-conn index-name)))

(defn index-exists?
  [datomic-db es-conn catalog-id]
  (let [catalog (catalog/get-catalog datomic-db catalog-id)
        index-name (:catalog/name catalog)]
    (index/index-exists? es-conn index-name)))

(defn create-index!
  ([es-conn index-name]
   (create-index! es-conn index-name "marketplace/seed/mappings.json"))
  ([es-conn index-name mapping-file]
   (index/create-index! es-conn index-name mapping-file)))

(defn list-formats
  [es-conn]
  (format/list-formats es-conn))

(defn list-tags
  [es-conn]
  (tag/list-tags es-conn))

(defn list-vendors
  [datomic-db]
  (vendor/list-vendors datomic-db))

(defn vendor-exists?
  [datomic-db vendor-name]
  (vendor/get-vendor-by-name datomic-db vendor-name))

(defn create-vendor!
  [datomic-conn vendor]
  (vendor/create-vendor! datomic-conn vendor))

(defn get-vendor
  [datomic-db vendor-id]
  (vendor/find-vendor datomic-db vendor-id))

(defn delete-vendor!
  [datomic-conn vendor-id]
  (vendor/delete-vendor! datomic-conn vendor-id))

(defn update-vendor!
  [datomic-conn vendor-id params]
  (vendor/update-vendor! datomic-conn vendor-id params))

(defn list-categories
  [es-conn index-name]
  (category/list-categories es-conn index-name))

(defn create-catalog!
  [datomic-conn params]
  (catalog/create-catalog! datomic-conn params))

(defn list-catalogs
  [datomic-db]
  (catalog/list-catalogs datomic-db))

(defn find-categories
  [datomic-db es-conn query]
  (if (:catalog-id query)
    (category/search-categories datomic-db query)
    (category/find-categories datomic-db es-conn query)))

(defn create-categories!
  [es-conn index-name categories]
  (category/create-categories! es-conn index-name categories))

(defn create-category!
  [datomic-db datomic-conn params]
  (let [catalog (catalog/get-catalog datomic-db (:catalog-id params))
        params (assoc params :catalog catalog)]
    (category/create-category! datomic-conn params)))

(defn delete-category!
  [conn category-id]
  (category/delete-category! conn category-id))

(defn update-category!
  [conn params]
  (category/update-category! conn params))

(defn- assoc-catalog-with-dataset
  [datomic-db d]
  (assoc d
         :catalog
         (catalog/get-catalog
           datomic-db (:catalog d))))

(defn- assoc-dataset-with-subscription
  [datasets s]
  (assoc s :dataSet (first
                      (filter #(= [(:index %)
                                   (str (:id %))]
                                  [(:subscription/index-name s)
                                   (:subscription/data-set-id s)])
                              datasets))))

(defn list-subscriptions
  [datomic-db es-conn user-id]
  (let [subscriptions (subscription/find-subscriptions-by-user-id datomic-db user-id)
        datasets (->> subscriptions
                      (map :subscription/data-set-id)
                      (dataset/find-datasets-by-ids es-conn)
                      :data
                      (map
                        (partial assoc-catalog-with-dataset datomic-db)))]
    (map
      #(-> (assoc-dataset-with-subscription datasets %)
           (set/rename-keys {:created-at :createdAt}))
      subscriptions)))

(defn create-subscription!
  [datomic-db datomic-conn catalog-id dataset-id user-id]
  (let [catalog (catalog/get-catalog datomic-db catalog-id)
        index-name (:catalog/name catalog)]
    (subscription/create-subscription! datomic-conn index-name dataset-id user-id)))

(defn retract-subscription!
  [datomic-db datomic-conn catalog-id dataset-id user-id]
  (let [catalog (catalog/get-catalog datomic-db catalog-id)
        index-name (:catalog/name catalog)]
    (subscription/retract-subscription! datomic-conn index-name dataset-id user-id)))

(defn subscribed?
  [datomic-db catalog-id dataset-id user-id]
  (let [catalog (catalog/get-catalog datomic-db catalog-id)
        index-name (:catalog/name catalog)]
    (subscription/subscribed? datomic-db index-name dataset-id user-id)))

(defn create-rating!
  [datomic-db datomic-conn catalog-id dataset-id user-id rating]
  (let [catalog (catalog/get-catalog datomic-db catalog-id)
        index-name (:catalog/name catalog)]
    (rating/create-rating! datomic-conn index-name dataset-id user-id rating)))

(defn get-rating
  [datomic-db catalog-id dataset-id user-id]
  (let [catalog (catalog/get-catalog datomic-db catalog-id)
        index-name (:catalog/name catalog)]
    (rating/get-rating datomic-db index-name dataset-id user-id)))

(defn get-average-rating
  [datomic-db catalog-id dataset-id]
  (let [catalog (catalog/get-catalog datomic-db catalog-id)
        index-name (:catalog/name catalog)]
    (rating/get-average-rating datomic-db index-name dataset-id)))
