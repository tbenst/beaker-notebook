(ns bunsen.provisioner.resource
  (:require [crypto.random :as random]
            [clojure.data.json :as json]
            [liberator.core :refer [defresource]]
            [liberator.representation :refer [ring-response as-response]]
            [bunsen.provisioner.model.beaker :as b]
            [bunsen.common.helper.resource :as resource]
            [bunsen.provisioner.protocol.store :as store]
            [bunsen.provisioner.protocol.container :as container]))

(defresource status [_] resource/defaults
  :handle-ok (constantly "ok"))

(defresource instance [_] resource/bunsen-defaults
  :allowed-methods #{:get :post}
  :exists? (fn [{{container :container} :request}]
             (let [id (get-in request [:session :id])]
               {::instance (container/inspect container id)}))
  :handle-ok ::instance

  :post! (fn [{{conn :conn {id :id} :session config :config container :container remote-user :remote-user} :request}]
           ; use the same token for all users in test env
           (let [token (or (:beaker-token config) (random/hex 20))
                 beaker (b/find-or-create-beaker! conn {:user-id id :token token})]
             (when-let [i (container/create!
                            container
                            ;; FIXME: refactor to use middleware pattern
                            (-> (container/default container)
                                (assoc :id id)
                                (update-in [:env] merge {"BAMBOO_HOST" (:bamboo-host config)
                                                         "BAMBOO_PATH" (str "/beaker/" id "/")
                                                         "BEAKER_COOKIE" token
                                                         "AUTHORIZED_USER" remote-user})
                                (update-in [:volumes] conj {:mode "RW"
                                                            :host (str (:store-root config) "/" id)
                                                            :container "/mnt/scratch"})))]
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

(defresource files [_] resource/bunsen-defaults
  :allowed-methods #{:get :post :delete}

  :handle-ok (fn [{{{id :id} :session store :store} :request}]
               (store/list store id))

  :post! (fn [{{{file :file} :params {id :id} :session store :store} :request}]
           (when-not (try
                       (store/put! store id (:filename file) (:tempfile file))
                       (catch java.io.IOException _ nil))
             (ring-response {:status 422})))

  :delete! (fn [{{params :params {id :id} :session store :store} :request}]
             (doseq [[_ filename] params]
               (store/delete! store id filename))))

(defresource  files-quota [_] resource/bunsen-defaults
  :handle-ok (fn [{{{id :id} :session store :store} :request}]
               (str (store/quota store id))))

(def resources
  {:status status
   :instance instance
   :files files
   :files-quota files-quota})
