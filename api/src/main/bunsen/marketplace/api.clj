(ns bunsen.marketplace.api
  (:require [clojure.set :as set]
            [bunsen.marketplace.model.tag :as tag]
            [bunsen.marketplace.model.index :as index]
            [bunsen.marketplace.model.vendor :as vendor]
            [bunsen.marketplace.model.format :as format]
            [bunsen.marketplace.model.rating :as rating]
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

(defn find-datasets
  [datomic-db es-conn index-name query]
  (->> (:category-path query)
       (category/get-category es-conn index-name)
       (category/get-category-catalog es-conn index-name)
       (dataset/find-datasets es-conn index-name query)
       (merge-average-ratings-for-datasets datomic-db index-name)))

(defn get-dataset
  [datomic-db es-conn index-name dataset-id]
  (let [dataset (dataset/get-dataset es-conn index-name dataset-id)
        catalog (category/get-category-catalog es-conn index-name (-> dataset :categories first))
        related (->> (dataset/find-datasets
                       es-conn index-name {:from 0
                                           :size 5
                                           :exclude dataset-id
                                           :tags (:tags dataset)
                                           :category-path (:path catalog)} catalog)
                     (merge-average-ratings-for-datasets datomic-db index-name)
                     :data)
        subscriber-ids (subscription/find-subscription-user-ids-by-dataset-id
                         datomic-db index-name dataset-id)]
    (assoc dataset
           :index index-name
           :catalog catalog
           :subscriberIds subscriber-ids
           :related related)))

(defn update-category-counts!
  [es-conn index-name]
  (index/refresh-index! es-conn index-name)
  (->> (category/list-categories es-conn index-name)
       (mapv
         #(->> %
               (category/get-category-catalog es-conn index-name)
               (dataset/count-datasets-by-category es-conn index-name %)
               (category/update-category-count! es-conn index-name %)))))

(defn create-dataset!
  [es-conn index-name dataset]
  (dataset/create-dataset! es-conn index-name dataset)
  ;; TODO: move this to a queue instead of spinning up a new thread each time
  (future
    (update-category-counts! es-conn index-name)))

(defn update-dataset!
  [es-conn index-name dataset-id dataset]
  (dataset/update-dataset!
    es-conn index-name dataset-id (dissoc dataset :index :catalog :subscriberIds :related))
  (future
    (update-category-counts! es-conn index-name)))

(defn retract-dataset!
  [es-conn index-name dataset-id]
  (dataset/retract-dataset! es-conn index-name dataset-id)
  (future
    (update-category-counts! es-conn index-name)))

(defn create-datasets!
  [es-conn index-name datasets]
  (->> (category/list-categories es-conn index-name)
       (dataset/create-datasets! es-conn index-name datasets))
  (update-category-counts! es-conn index-name))

(defn update-dataset-mappings!
  [es-conn index-name]
  (->> (category/list-categories es-conn index-name)
       (dataset/update-dataset-mappings! es-conn index-name)))

(defn index-exists?
  [es-conn index-name]
  (index/index-exists? es-conn index-name))

(defn refresh-index!
  [es-conn index-name]
  (index/refresh-index! es-conn index-name))

(defn create-index!
  ([es-conn index-name]
   (create-index! es-conn index-name "marketplace/seed/mappings.json"))
  ([es-conn index-name mapping-file]
   (index/create-index! es-conn index-name mapping-file)))

(defn list-indices
  [es-conn]
  (index/list-indices es-conn))

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

(defn delete-vendor!
  [datomic-conn vendor-id]
  (vendor/delete-vendor! datomic-conn vendor-id))

(defn update-vendor!
  [datomic-conn vendor-id params]
  (vendor/update-vendor! datomic-conn vendor-id params))

(defn list-categories
  [es-conn index-name]
  (category/list-categories es-conn index-name))

(defn find-categories
  [es-conn query]
  (category/find-categories es-conn query))

(defn create-categories!
  [es-conn index-name categories]
  (category/create-categories! es-conn index-name categories))

(defn- assoc-catalog-with-dataset
  [es-conn d]
  (assoc d
         :catalog
         (category/get-category-catalog
           es-conn (:index d) (-> d :categories first))))

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
                        (partial assoc-catalog-with-dataset es-conn)))]
    (map
      #(-> (assoc-dataset-with-subscription datasets %)
           (set/rename-keys {:created-at :createdAt}))
      subscriptions)))

(defn retract-subscriptions!
  [datomic-conn]
  (subscription/retract-subscriptions! datomic-conn))

(defn create-subscription!
  [datomic-conn index-name dataset-id user-id]
  (subscription/create-subscription! datomic-conn index-name dataset-id user-id))

(defn retract-subscription!
  [datomic-conn index-name dataset-id user-id]
  (subscription/retract-subscription! datomic-conn index-name dataset-id user-id))

(defn subscribed?
  [datomic-db index-name dataset-id user-id]
  (subscription/subscribed? datomic-db index-name dataset-id user-id))

(defn create-rating!
  [datomic-conn index-name dataset-id user-id rating]
  (rating/create-rating! datomic-conn index-name dataset-id user-id rating))

(defn get-rating
  [datomic-db index-name dataset-id user-id]
  (rating/get-rating datomic-db index-name dataset-id user-id))

(defn get-average-rating
  [datomic-db index-name dataset-id]
  (rating/get-average-rating datomic-db index-name dataset-id))
