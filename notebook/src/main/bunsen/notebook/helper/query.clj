(ns bunsen.notebook.helper.query
  (:require [datomic.api :as d]
            [clj-time.coerce :as t]))

(defn find-all
  "Finds entities matching the query.
  Pulls and returns the entities from the db according to the given pattern specification."
  [{:keys [db query pattern args]}]
  (->> (apply d/q query db args)
       (map first)
       (d/pull-many db pattern)))

(defn paginate [results offset limit]
  (->> results
       (drop offset)
       (take limit)))

(defn tx-instants
  "Returns all transaction instants (timestamps) for a given entity."
  [db eid]
  (->> (d/q '[:find ?instant
              :in $ ?e
              :where
              [?e _ _ ?tx]
              [?tx :db/txInstant ?instant]]
            (d/history db) eid)
       (map first)
       (sort)))

(defn timestamps
  "Returns created-at/updated-at timestamps for a given entity."
  [db eid]
  {:created-at (t/from-date (first (tx-instants db eid)))
   :updated-at (t/from-date (last (tx-instants db eid)))})
