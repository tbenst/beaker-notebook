(ns bunsen.provisioner.resource
  (:require [liberator.core :refer [defresource]]
            [clojure.data.json :as json]
            [bunsen.provisioner.lifecycle :refer [lifecycle] :as lifecycle]
            [bunsen.provisioner.lifecycle.local]
            [bunsen.provisioner.lifecycle.docker]
            [liberator.representation :refer [ring-response as-response]]
            [bunsen.provisioner.model.beaker :as b]
            [crypto.random :as random]
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

  :post! (fn [{{conn :conn {id :id} :session} :request}]
           (let [token (random/hex 20)
                 beaker (b/find-or-create-beaker! conn {:user-id id :token token})]
             (when-let [i (lifecycle/create!
                            (lifecycle config)
                            {:id id :token (:beaker/token beaker)})]
               {::instance i
                ::token (:beaker/token beaker)})))

  :handle-created (fn [{instance ::instance token ::token :as ctx}]
                    ; write "beakerauth" cookie
                    (ring-response (assoc (as-response instance ctx)
                                     :cookies {"beakerauth" {:value token
                                                             :http-only true
                                                             :max-age 2592000 ; 30 days in seconds
                                                             :path "/"}})))

  :available-media-types ["application/json"])

(def resources
  {:status status
   :instance instance})
