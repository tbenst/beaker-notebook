(ns bunsen.common.helper.query
  (:require [datomic.api :as d]
            [clj-time.coerce :as t]))

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
