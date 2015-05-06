(ns bunsen.user.resource.seed
  (:require [liberator.core :refer [defresource]]
            [datomic.api :as d]
            [bunsen.common.component.database :as db]
            [bunsen.user.resource.defaults :refer [defaults]]))

(defresource seed [config] defaults
  :allowed? (= "true" (:allow-seed config))

  :allowed-methods [:delete]

  :delete! (fn [ctx]
             (let [uri (:database-uri config)
                   conn (get-in ctx [:request :conn])]
               (d/delete-database uri)
               (d/create-database uri)
               (db/migrate conn "migrations.edn"))))
