(ns bunsen.provisioner.resource
  (:require [clojure.data.json :as json]
            [clojure.string :as str]
            [liberator.core :refer [defresource]]
            [liberator.representation :refer [ring-response as-response]]
            [bunsen.provisioner.api :as api]
            [bunsen.common.helper.resource :as resource]
            [bunsen.provisioner.protocol.store :as store]))

(defresource status [_] resource/defaults
  :handle-ok (constantly "ok"))

(defresource instance [_] resource/bunsen-defaults
  :allowed-methods #{:get :post}
  :exists? (fn [{{container :container} :request}]
             (let [id (get-in request [:session :id])]
               {::instance (api/inspect-container container id)}))
  :handle-ok ::instance

  :post! (fn [{{conn :conn
                {user-id :id} :session
                config :config
                container :container
                remote-user :remote-user}
               :request}]
           {::container (api/create-container! {:conn conn
                                                :user-id user-id
                                                :config config
                                                :container container
                                                :remote-user remote-user})})

  :handle-created (fn [{container ::container :as ctx}]
                    ; write "beakerauth" cookie
                    (ring-response (assoc (as-response container ctx)
                                          :cookies {"beakerauth" {:value (:token container)
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
