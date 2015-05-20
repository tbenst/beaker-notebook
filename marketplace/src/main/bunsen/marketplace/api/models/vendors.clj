(ns bunsen.marketplace.api.models.vendors
  (:require [bunsen.marketplace.helper.api :as helper]
            [bunsen.common.helper.query :as q]
            [datomic.api :as d]))

(defn get-vendors [db]
  (let [vendors (d/q '[:find [(pull ?v [*]) ...]
                       :where [?v :vendor/name]]
                     db)]
    (map #(merge % (q/timestamps db (:db/id %))) vendors)))

(defn get-vendor-by-name [db name]
  (d/q '[:find (pull ?v [*]) .
         :in $ ?name
         :where
         [?v :vendor/name ?name]]
       db name))

(defn create! [conn body]
  (let [vendor {:db/id (d/tempid :db.part/user)
                :vendor/name (:name body)}]
    @(d/transact conn [vendor])))
