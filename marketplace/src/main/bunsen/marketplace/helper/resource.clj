(ns bunsen.marketplace.helper.resource
  (:require [clojure.data.json :as json]
            [bunsen.marketplace.api.domain :as domain]
            [bunsen.marketplace.api.models.datasets :as datasets]))

(def defaults
  {:allowed-methods #{:get}
   :available-media-types #{"text/plain" "application/json"}
   :handle-exception #(-> % :exception throw)})

(defn admin? [config ctx]
  (if (= "true" (:allow-seed config))
    true
    (= 1 (-> ctx :request :session :role))))

(defn get-params
  [ctx]
  (-> ctx :request :params))

(defn get-body
  [ctx]
  (-> ctx :request :body))

(defn pass-body
  [f config ctx]
  (domain/update-marketplace config (get-body ctx) f))

(defn get? [ctx]
  (= :get (-> ctx :request :request-method)))
