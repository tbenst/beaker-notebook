(ns bunsen.publications.presenter.publications
  (:require [datomic.api :as d]
            [bunsen.publications.helper.query :as q]
            [bunsen.publications.helper.entity :as e]))

(defn find-publication [db eid]
  (e/load-entity db eid :publication/name))

(defn create-publication [conn attrs]
  (->> (e/insert-or-update-tx attrs)
       (d/transact conn)))

(defn update-publication [conn id attrs]
  (->> (merge attrs {:db/id (Long. id)})
       e/insert-or-update-tx
       (d/transact conn)))

(defn delete-publication [conn id]
  (d/transact conn [[:db.fn/retractEntity id]]))

(defn find-publications [db cid term]
  (let [category-id (if cid (Long. cid))
        wildcard-term (str term "*")
        rules '[[(has-text ?p ?term) [(fulltext $ :publication/name ?term) [[?p ?text]]]]
                [(has-text ?p ?term) [(fulltext $ :publication/description ?term) [[?p ?text]]]]]
        query (cond-> '{:find [?p]
                        :in [$ % [?category-id ?term]]
                        :where [[?p :publication/name]]}
                      category-id (q/constrain '[?p :publication/category ?category-id])
                      term (q/constrain '(has-text ?p ?term)))]
    (q/find-all {:db db
                 :query query
                 :pattern '[:db/id :publication/name :publication/description :publication/author
                            :publication/notebook-id {:publication/category [*]}]
                 :args [rules [category-id wildcard-term]]})))
