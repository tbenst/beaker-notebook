(ns bunsen.marketplace.model.vendor
  (:require [datomic.api :as d]
            [bunsen.common.helper.query :as q]))

(defn list-vendors
  [datomic-db]
  (->> (d/q '[:find [(pull ?v [*]) ...]
              :where [?v :vendor/name]]
            datomic-db)
       (map
         #(merge % (q/timestamps datomic-db (:db/id %))))))

(defn get-vendor-by-name
  [datomic-db vendor-name]
  (d/q '[:find (pull ?v [*]) .
         :in $ ?name
         :where [?v :vendor/name ?name]]
       datomic-db vendor-name))

(defn create-vendor!
  [datomic-conn vendor]
  @(d/transact datomic-conn
               [{:db/id (d/tempid :db.part/user)
                 :vendor/name (:name vendor)}]))
