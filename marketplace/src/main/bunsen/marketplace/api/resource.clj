(ns bunsen.marketplace.api.resource
  (:require [liberator.core :refer [defresource]]
            [bunsen.marketplace.helper.resource :as resource]
            [bunsen.marketplace.api.domain :as domain]
            [clojure.data.json :as json]))

(defn is-admin? [config ctx]
  (if (= "true" (:allow-seed config))
    true
    (= "1" (-> ctx :request :session :role))))

(defn get-body
  [ctx]
  (let [body (-> ctx :request :body slurp)]
        (json/read-str body :key-fn keyword)))

(defn pass-body
  [biz-fn config ctx]
  (domain/update-marketplace config (get-body ctx) biz-fn))

(defresource status [_ _] resource/defaults
  :handle-ok domain/get-status)

(defresource categories [config _] resource/defaults
  :allowed? (partial is-admin? config)
  :allowed-methods #{:post}
  :processable? (partial pass-body domain/create-categories config))

(defresource datasets [config _] resource/defaults
  :allowed? (partial is-admin? config)
  :allowed-methods #{:post}
  :processable? (partial pass-body domain/create-datasets config))

(defresource dataset [config  {:keys  [index-name id]}] resource/defaults
  :allowed? (partial is-admin? config)
  :allowed-methods #{:put}
  :put! (partial pass-body domain/update-dataset config))

(defresource refresh [config _] resource/defaults
  :allowed? (partial is-admin? config)
  :allowed-methods #{:put}
  :put! (partial pass-body domain/refresh-index config))

(defresource counts [config _] resource/defaults
  :allowed? (partial is-admin? config)
  :allowed-methods #{:put}
  :put! (partial pass-body domain/update-counts config))

(defresource mappings [config _] resource/defaults
  :allowed? (partial is-admin? config)
  :allowed-methods #{:put}
  :put! (partial pass-body domain/update-mappings config))

(defresource indices [config _] resource/defaults
  :allowed? (partial is-admin? config)
  :allowed-methods #{:post}
  :post! (partial pass-body domain/create-index config))

(defresource default [_ _] resource/defaults
  :exists? (constantly false))
