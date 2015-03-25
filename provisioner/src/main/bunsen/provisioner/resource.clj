(ns bunsen.provisioner.resource
  (:require [liberator.core :refer [defresource]]
            [bunsen.provisioner.lifecycle :refer [lifecycle] :as lifecycle]
            [bunsen.provisioner.lifecycle.local]
            [bunsen.provisioner.lifecycle.docker]
            [bunsen.provisioner.lifecycle.marathon]))

(def defaults
  {:allowed-methods #{:get}
   :available-media-types #{"text/plain" "application/json"}
   :handle-exception (fn [ctx]
                       (-> ctx :exception throw))})

(defresource status [_] defaults
  :handle-ok (constantly "ok"))

(defresource instance [config] defaults
  :exists? (fn [ctx] {::instance
                      (lifecycle/inspect
                        (lifecycle config)
                        (get-in ctx [:request :route-params :id]))})
  :handle-ok ::instance)

(defresource instances [config] defaults
  :allowed-methods #{:post}
  :post! (fn [ctx]
           (when-let [i (lifecycle/create!
                          (lifecycle config)
                          (get-in ctx [:request :params]))]
             {::instance i}))
  :handle-created ::instance
  :available-media-types ["application/json"])

(def resources
  {:status status
   :instance instance
   :instances instances})
