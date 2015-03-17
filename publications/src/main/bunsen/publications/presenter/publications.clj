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
