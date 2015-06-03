(ns bunsen.marketplace.model.vendor
  (:require [datomic.api :as d]
            [bunsen.common.helper.query :as q]
            [bunsen.common.helper.utils :as utils]))

(defn find-vendor [datomic-db vendor-id]
  (d/q '[:find (pull ?v [*]) .
         :in $ ?pid
         :where
         [?v :vendor/public-id ?pid]]
       datomic-db (utils/uuid-from-str vendor-id)))

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
                 :vendor/public-id (d/squuid)
                 :vendor/name (:name vendor)}]))

(defn delete-vendor! [datomic-conn vendor-id]
  (when-let [vendor (find-vendor (d/db datomic-conn) vendor-id)]
    @(d/transact datomic-conn [[:db.fn/retractEntity (:db/id vendor)]])))

(defn update-vendor!
  [datomic-conn vendor-id params]
  (when-let [v (find-vendor (d/db datomic-conn) vendor-id)]
    (let [tx (-> params
                 utils/remove-nils
                 (utils/namespace-keys "vendor")
                 (assoc :db/id (:db/id v))
                 (dissoc :vendor/id params))]
      @(d/transact datomic-conn [tx])
      (dissoc tx :db/id))))
