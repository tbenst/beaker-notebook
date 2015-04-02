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


;; TODO remove this function and use bunsen_cookie_store.clj instead.
;; Reads user-id directly from cookie session but doesn't verify
;; the session signature.
(defn extract-user-id [req]
  (let [session (get-in req [:cookies "session" :value])
        stripped-signed (subs session 4)
        raw-val (subs stripped-signed 0 (.lastIndexOf stripped-signed "."))
        user (json/read-str raw-val :key-fn keyword)
        user-id (:id user)]
    user-id))

(defresource instance [config] defaults
  :allowed-methods #{:get :post}
  :exists? (fn [_]
             (let [id (extract-user-id request)]
               {::instance
                (lifecycle/inspect (lifecycle config) id)}))
  :handle-ok ::instance
  :post! (fn [_]
           (let [token (get-in request [:cookies "beakerauth" :value])
                 id (extract-user-id request)]
             (when-let [i (lifecycle/create!
                            (lifecycle config)
                            {:id id :token token})]
               {::instance i})))
  :handle-created ::instance
  :available-media-types ["application/json"])

(def resources
  {:status status
   :instance instance})
