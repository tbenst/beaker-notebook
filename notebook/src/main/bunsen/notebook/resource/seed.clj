(ns bunsen.notebook.resource.seed
  (:require [liberator.core :refer [defresource]]
            [datomic.api :as d]
            [bunsen.common.component.database :as db]
            [bunsen.notebook.helper.resource :as resource]))

(defresource seed [_] resource/defaults
  :allowed-methods [:delete]
  :delete! (fn [{{{uri :database-uri} :config} :request}]
             (d/delete-database uri)
             (d/create-database uri)
             (db/migrate (d/connect uri) "migrations.edn")))
