(ns bunsen.provisioner.resource
  (:require [clojure.data.json :as json]
            [crypto.random :as random]
            [liberator.core :refer [defresource]]
            [liberator.representation :refer [ring-response as-response]]
            [bunsen.provisioner.lifecycle :refer [lifecycle] :as lifecycle]
            [bunsen.provisioner.lifecycle.local]
            [bunsen.provisioner.lifecycle.docker]
            [bunsen.provisioner.model.beaker :as b]
            [bunsen.provisioner.lifecycle.marathon]
            [bunsen.common.helper.resource :refer [defaults]]))

(defresource status [_] defaults
  :handle-ok (constantly "ok"))

(defresource instance [_] defaults
  :allowed-methods #{:get :post}
  :exists? (fn [{{config :config} :request}]
             (let [id (get-in request [:session :id])]
               {::instance
                (lifecycle/inspect (lifecycle config) id)}))
  :handle-ok ::instance

  :post! (fn [{{conn :conn {id :id} :session config :config remote-user :remote-user} :request}]
           ; use the same token for all users in test env
           (let [token (if (:beakerauth-token config) (:beakerauth-token config) (random/hex 20))
                 beaker (b/find-or-create-beaker! conn {:user-id id :token token})]
             (when-let [i (lifecycle/create!
                            (lifecycle config)
                            {:id id :token (:beaker/token beaker) :user remote-user})]
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
