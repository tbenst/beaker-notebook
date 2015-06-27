(ns bunsen.marketplace.model.catalog
  (:require [datomic.api :as d]
            [clojure.data.json :as json]
            [bunsen.common.helper.utils :as u]))

(defn create-catalog!
  [conn params]
  (let [c {:db/id (d/tempid :db.part/user)
           :catalog/public-id (d/squuid)
           :catalog/name (:name params)
           :catalog/base-path (:base-path params)
           :catalog/mapping (json/write-str (:mapping params))}]
    @(d/transact conn [(u/remove-nils c)])
    (dissoc c :db/id)))

(defn list-catalogs
  [datomic-db]
  (d/q '[:find [(pull ?c [*]) ...]
         :in $
         :where [?c :catalog/public-id]]
       datomic-db))

(defn get-catalog
  [datomic-db catalog-id]
  (d/q '[:find (pull ?c [*]) .
         :in $ ?cid
         :where [?c :catalog/public-id ?cid]]
       datomic-db (u/uuid-from-str catalog-id)))
