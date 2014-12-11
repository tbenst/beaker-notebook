(ns bunsen.provisioner.resource.api
  (:require [liberator.core :refer [defresource]]
            [bunsen.provisioner.helper.resource :as resource]
            [bunsen.provisioner.presenter.api :as api]))

(defresource status [_ _] resource/defaults
  :handle-ok api/get-status)

(defresource default [_ _] resource/defaults
  :exists? (constantly false))

(defresource instance [{:keys [config]} {:keys [id]}] resource/defaults
  :exists? (fn [_] {::instance (api/get-instance config id)})
  :handle-ok ::instance)

(defresource instances [{:keys [config]} _] resource/defaults
  :allowed-methods #{:post}
  :post! (fn [ctx]
           (when-let [i (api/create-instance
                          config
                          (get-in ctx [:request :params]))]
             {::instance i}))
  :handle-created ::instance
  :available-media-types ["application/json"])
