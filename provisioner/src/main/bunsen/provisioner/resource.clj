(ns bunsen.provisioner.resource
  (:require [liberator.core :refer [defresource]]
            [clojure.data.json :as json]
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
  :allowed-methods #{:get :post}
  :exists? (fn [_]
             (let [id (get-in request [:session :id])]
               {::instance
                (lifecycle/inspect (lifecycle config) id)}))
  :handle-ok ::instance
  :post! (fn [_]
           (let [token (get-in request [:cookies "beakerauth" :value])
                 id (get-in request [:session :id])]
             (when-let [i (lifecycle/create!
                            (lifecycle config)
                            {:id id :token token})]
               {::instance i})))
  :handle-created ::instance
  :available-media-types ["application/json"])

(def resources
  {:status status
   :instance instance})
