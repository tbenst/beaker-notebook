(ns bunsen.provisioner.resource
  (:require [liberator.core :refer [defresource]]
            [bunsen.provisioner.helper.resource :as resource]
            [bunsen.provisioner.lifecycle :refer [lifecycle] :as lifecycle]
            [bunsen.provisioner.lifecycle.marathon]))

(defresource status [_ _] resource/defaults
  :handle-ok (constantly "ok"))

(defresource default [_ _] resource/defaults
  :exists? (constantly false))

(defresource instance [{:keys [config]} {:keys [id]}] resource/defaults
  :exists? (fn [_] {::instance
                    (lifecycle/inspect (lifecycle config) id)})
  :handle-ok ::instance)

(defresource instances [{:keys [config]} _] resource/defaults
  :allowed-methods #{:post}
  :post! (fn [ctx]
           (when-let [i (lifecycle/create!
                          (lifecycle config)
                          (get-in ctx [:request :params]))]
             {::instance i}))
  :handle-created ::instance
  :available-media-types ["application/json"])
