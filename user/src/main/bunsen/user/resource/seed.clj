(ns bunsen.user.resource.seed
  (:require [liberator.core :refer [defresource]]
            [datomic.api :as d]
            [bunsen.user.model.user :as u]
            [bunsen.common.component.database :as db]
            [bunsen.user.resource.defaults :refer [defaults]]))

(defresource seed [config] defaults
  :allowed? (= "true" (:allow-seed config))

  :allowed-methods [:delete]

  :delete! (fn [ctx]
             (let [conn (-> ctx :request :conn)]
               (u/excise-all-users! conn))))
