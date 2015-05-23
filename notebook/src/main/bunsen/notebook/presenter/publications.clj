(ns bunsen.notebook.presenter.publications
  (:require [datomic.api :as d]
            [clojure.instant :as inst]
            [bunsen.common.helper.utils :as utils]
            [bunsen.notebook.presenter.categories :refer [find-category]]
            [bouncer.core :as b]
            [bouncer.validators :as v]))

(defn find-publication [db pub-id]
  (d/q '[:find (pull ?p [*]) .
         :in $ ?pid
         :where
         [?p :publication/public-id ?pid]]
       db (utils/uuid-from-str pub-id)))

(defn find-publication-by-author [db author-id pub-id]
  (d/q '[:find (pull ?p [* {:publication/notebook [*]}]) .
         :in $ [?aid ?pid]
         :where
         [?p :publication/public-id ?pid]
         [?p :publication/author-id ?aid]]
       db (mapv utils/uuid-from-str [author-id pub-id])))

(defn load-publication [db pub-id]
  (when-let [p (when pub-id
                 (find-publication db pub-id))]
    (dissoc p :db/id)))

(defn find-notebook [db notebook-id user-id]
  (d/q '[:find (pull ?n [* {:notebook/project [:project/public-id]}]) .
         :in $ [?n-id ?u-id]
         :where [?n :notebook/public-id ?n-id]]
       db (mapv utils/uuid-from-str [notebook-id user-id])))

(defn create-publication! [conn author-id {:keys [categoryID notebook-id name description]}]
  (let [n (find-notebook (d/db conn) notebook-id author-id)
        c (find-category (d/db conn) categoryID)
        p {:db/id (d/tempid :db.part/user)
           :publication/public-id (d/squuid)
           :publication/notebook (:db/id n)
           :publication/category (:db/id c)
           :publication/created-at (utils/now)
           :publication/updated-at (utils/now)
           :publication/name (:notebook/name n)
           :publication/description description
           :publication/contents (:notebook/contents n)
           :publication/author-id (utils/uuid-from-str author-id)}]
    @(d/transact conn [(utils/remove-nils p)])
    (dissoc p :db/id)))

(defn update-publication! [conn author-id pub-id params]
  (when-let [p (find-publication-by-author (d/db conn) author-id pub-id)]
    (let [category-id (:categoryID params)
          n (:publication/notebook p)
          c (find-category (d/db conn) category-id)
          tx (-> params
                 (dissoc :public-id :pub-id :created-at :updated-at :notebook-id :categoryID)
                 (assoc :category (:db/id c))
                 (assoc :contents (:notebook/contents n) :name (:notebook/name n))
                 utils/remove-nils
                 (utils/namespace-keys "publication")
                 (assoc :db/id (:db/id p) :publication/updated-at (utils/now)))]
      @(d/transact conn [tx])
      tx)))

(defn delete-publication! [conn author-id pub-id]
  (when-let [p (find-publication-by-author (d/db conn) author-id pub-id)]
    @(d/transact conn [[:db.fn/retractEntity (:db/id p)]])))

(defn constrain-query [query conditions]
  (update-in query [:where] into conditions))

(defn calc-avg-rating [pub]
  (let [scores (map #(:rating/score %) (:publication/ratings pub))]
    (when-not (empty? scores)
      (/ (apply + scores) (count scores)))))

(defn find-publications [db category-id search-term]
  (let [wildcard-term (str search-term "*")
        rules '[[(has-text ?p ?term) [(fulltext $ :publication/name ?term) [[?p ?text]]]]
                [(has-text ?p ?term) [(fulltext $ :publication/description ?term) [[?p ?text]]]]]
        query (cond-> '{:find [[(pull ?p [:db/id :publication/name :publication/description
                                          :publication/public-id :publication/author-id
                                          :publication/notebook-id
                                          {:publication/ratings [:rating/score]}
                                          {:publication/category [*]}]) ...]]
                        :in [$ % [?category-id ?term]]
                        :where [[?p :publication/name]]}
                      category-id (constrain-query '[[?c :category/public-id ?category-id]
                                                     [?p :publication/category ?c]])
                      search-term (constrain-query '[(has-text ?p ?term)]))
        results (d/q query db rules [(when category-id (utils/uuid-from-str category-id)) wildcard-term])]
    (map #(assoc % "averageRating" (calc-avg-rating %)) results)))

(defn validate-publication [params]
  (-> (b/validate (select-keys params [:description :notebook-id])
                  :description v/required
                  :notebook-id v/required)
      first))
