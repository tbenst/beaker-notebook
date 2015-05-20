(ns bunsen.marketplace.api.models.vendors
  (:require [bunsen.marketplace.helper.api :as helper]
            [bunsen.common.helper.query :as q]
            [datomic.api :as d]))

(defn get-vendors [db]
  (let [vendors (d/q '[:find [(pull ?v [*]) ...]
                       :where [?v :vendor/name]]
                     db)]
    (map #(merge % (q/timestamps db (:db/id %))) vendors)))
