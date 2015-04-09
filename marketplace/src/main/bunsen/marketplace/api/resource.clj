(ns bunsen.marketplace.api.resource
  (:require [liberator.core :refer [defresource]]
            [bunsen.marketplace.helper.resource :as resource]
            [bunsen.marketplace.api.domain :as domain]))

(defresource status [_ _] resource/defaults
  :handle-ok domain/get-status)

(defresource categories [config _] resource/defaults
  :allowed? (partial resource/is-admin? config)
  :allowed-methods #{:get :post}
  :handle-ok #(domain/get-categories config (resource/get-params %))
  :post! (partial resource/pass-body domain/create-categories config))

(defresource seed-datasets [config _] resource/defaults
  :allowed? (partial resource/is-admin? config)
  :allowed-methods #{:post}
  :processable? (partial resource/pass-body domain/create-datasets config))

(defresource datasets [config {:keys [index-name]}] resource/defaults
  :allowed-methods #{:post}
  :post! #(domain/create-dataset config index-name (resource/get-body %)))

(defresource dataset [config  {:keys  [index-name id]}] resource/defaults
  :allowed? (partial resource/is-admin? config)
  :allowed-methods #{:put :delete}
  :delete! (fn [_] (domain/delete-dataset config index-name id))
  :put! (fn [ctx]
          (domain/update-dataset config index-name id (resource/get-body ctx))))

(defresource refresh [config _] resource/defaults
  :allowed? (partial resource/is-admin? config)
  :allowed-methods #{:put}
  :put! (partial resource/pass-body domain/refresh-index config))

(defresource counts [config _] resource/defaults
  :allowed? (partial resource/is-admin? config)
  :allowed-methods #{:put}
  :put! (partial resource/pass-body domain/update-counts config))

(defresource mappings [config _] resource/defaults
  :allowed? (partial resource/is-admin? config)
  :allowed-methods #{:put}
  :put! (partial resource/pass-body domain/update-mappings config))

(defresource indices [config _] resource/defaults
  :allowed? (partial resource/is-admin? config)
  :allowed-methods #{:post :get}
  :handle-ok (partial domain/get-indicies config)
  :post! (partial resource/pass-body domain/create-index config))

(defresource formats [config _] resource/defaults
  :allowed? (partial resource/is-admin? config)
  :handle-ok (domain/get-formats config))

(defresource tags [config _] resource/defaults
  :allowed? (partial resource/is-admin? config)
  :handle-ok (domain/get-tags config))

(defresource vendors [config _] resource/defaults
  :allowed? (partial resource/is-admin? config)
  :handle-ok (domain/get-vendors config))

(defresource default [_ _] resource/defaults
  :exists? (constantly false))
