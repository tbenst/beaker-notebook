(ns bunsen.user.resource.seed
  (:require [liberator.core :refer [defresource]]
            [datomic.api :as d]
            [bunsen.common.component.database :as db]
            [bunsen.user.resource.defaults :refer [defaults]]))

(defresource seed [config] defaults
  :allowed? (= "true" (:allow-seed config))

  :allowed-methods [:delete]

  :delete! (fn [{{uri :db-uri} :request}]
             (d/delete-database uri)
             (d/create-database uri)
             (db/migrate (d/connect uri) "migrations.edn")))
