(ns bunsen.marketplace.api.resource
  (:require [liberator.core :refer [defresource]]
            [bunsen.marketplace.helper.resource :as resource]
            [bunsen.marketplace.api.domain :as domain]
            ))

(defn pass-body
  [biz-fn config ctx]
  (domain/update-marketplace config (-> ctx :request :body slurp) biz-fn))

(defresource status [_ _] resource/defaults
  :handle-ok domain/get-status)

(defresource categories [config _] resource/defaults
  :allowed-methods #{:post}
  :processable? (partial pass-body domain/create-categories config))

(defresource datasets [config _] resource/defaults
  :allowed-methods #{:post}
  :processable? (partial pass-body domain/create-datasets config))

(defresource refresh [config _] resource/defaults
  :allowed-methods #{:put}
  :put! (partial pass-body domain/refresh-index config))

(defresource counts [config _] resource/defaults
  :allowed-methods #{:put}
  :put! (partial pass-body domain/update-counts config))

(defresource mappings [config _] resource/defaults
  :allowed-methods #{:put}
  :put! (partial pass-body domain/update-mappings config))

(defresource indices [config _] resource/defaults
  :allowed-methods #{:post}
  :post! (partial pass-body domain/create-index config))

(defresource default [_ _] resource/defaults
  :exists? (constantly false))
