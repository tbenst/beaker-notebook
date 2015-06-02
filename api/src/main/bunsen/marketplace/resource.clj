(ns bunsen.marketplace.resource
  (:refer-clojure :exclude [get-method])
  (:require [bunsen.marketplace.api :as api]
            [bunsen.common.protocol.seedable :refer [unseed!]]
            [liberator.core :refer [defresource]]))

(defn get-*
  "Returns a function to extract keys from the request."
  [& xs]
  #(get-in % (cons :request xs)))

(def get-es (get-* :es))
(def get-datomic (get-* :datomic))
(def get-db (get-* :db))
(def get-conn (get-* :conn))
(def get-body (get-* :body))
(def get-params (get-* :params))
(def get-config (get-* :config))
(def get-method (get-* :request-method))
(def get-session (get-* :session))
(def get-user (get-* :session :id))
(def get-role (get-* :session :role))

(def get?
  (comp #{:get} get-method))

(def admin?
  (comp #{1} get-role))

(def allow-seed?
  (comp #{"true"} :allow-seed get-config))

(def defaults
  {:allowed-methods #{:get}
   :available-media-types #{"text/plain" "application/json"}})

(def restricted-read-defaults
  "Restricted reads *and* writes."
  (assoc defaults :allowed? (some-fn admin? allow-seed?)))

(def restricted-write-defaults
  "Public reads, restricted writes."
  (assoc defaults :allowed? (some-fn get? admin? allow-seed?)))

(defresource status [_] defaults
  :handle-ok (constantly "ok"))

(defresource default [_] defaults
  :exists? (constantly false))

(defresource seed [_] defaults
  :allowed? allow-seed?
  :allowed-methods #{:delete}
  :delete! #(unseed! (get-datomic %)))

(defresource seed-datasets [params] restricted-read-defaults
  :allowed-methods #{:post}
  :processable? #(api/create-datasets! (get-es %) (:indexName params) (:datasets params)))

(defresource seed-subscriptions [_] restricted-read-defaults
  :allowed-methods #{:delete}
  :delete! #(api/retract-subscriptions! (get-conn %)))

(defresource categories [params] restricted-write-defaults
  :allowed-methods #{:get :post}
  :handle-ok #(api/find-categories (get-es %) (get-params %))
  :post! #(api/create-categories! (get-es %) (:indexName params) (:categories params)))

(defresource datasets [{:keys [index-name] :as params}] restricted-write-defaults
  :exists? #(api/index-exists? (get-es %) index-name)
  :allowed-methods #{:get :post}
  :post! #(api/create-dataset! (get-es %) index-name params)
  :handle-ok #(api/find-datasets
                (get-db %) (get-es %) index-name (dissoc params :index-name)))

(defresource dataset [{:keys [index-name dataset-id] :as params}] restricted-write-defaults
  :exists? #(api/index-exists? (get-es %) index-name)
  :allowed-methods #{:get :put :delete}
  :delete! #(api/retract-dataset! (get-es %) index-name dataset-id)
  :put! #(api/update-dataset! (get-es %) index-name dataset-id params)
  :handle-ok #(api/get-dataset (get-db %) (get-es %) index-name dataset-id))

(defresource mappings [params] restricted-read-defaults
  :allowed-methods #{:put}
  :put! #(api/update-dataset-mappings! (get-es %) (:indexName params)))

(defresource indices [params] restricted-read-defaults
  :allowed-methods #{:get :post}
  :handle-ok #(api/list-indices (get-es %))
  :post! #(api/create-index! (get-es %) (:indexName params)))

(defresource refresh-index [params] restricted-read-defaults
  :allowed-methods #{:put}
  :put! #(api/refresh-index! (get-es %) (:indexName params)))

(defresource formats [_] restricted-read-defaults
  :handle-ok #(api/list-formats (get-es %)))

(defresource tags [_] restricted-read-defaults
  :handle-ok #(api/list-tags (get-es %)))

(defresource vendors [params] restricted-read-defaults
  :allowed-methods #{:get :post}
  :processable? (some-fn get? (complement
                                #(api/vendor-exists? (get-db %) (:name params))))
  :handle-unprocessable-entity {:mesage "Vendor Exists"}
  :post! #(api/create-vendor! (get-conn %) params)
  :handle-ok #(api/list-vendors (get-db %)))

(defresource vendor [{:keys [vendor-id] :as params}] restricted-read-defaults
  :allowed-methods #{:delete :put}
  :delete! #(api/delete-vendor! (get-conn %) vendor-id)
  :put! (fn [ctx]
          {::vendor (api/update-vendor! (get-conn ctx) vendor-id params)})
  :handle-created ::vendor)

(defresource subscription [{:keys [index-name dataset-id]}] defaults
  :allowed-methods #{:put :delete}
  :conflict? #(api/subscribed? (get-db %) index-name dataset-id (get-user %))
  :handle-conflict {:message "You are already subscribed to this dataset"}
  :put! #(api/create-subscription! (get-conn %) index-name dataset-id (get-user %))
  :delete! #(api/retract-subscription! (get-conn %) index-name dataset-id (get-user %)))

(defresource subscriptions [_] defaults
  :allowed-methods #{:get}
  :handle-ok #(api/list-subscriptions (get-db %) (get-es %) (get-user %)))

(defresource rating [{:keys [dataset-id index-name] :as params}] defaults
  :allowed?  #(or (get? %)
                  (api/subscribed? (get-db %) index-name dataset-id (get-user %)))
  :allowed-methods #{:get :post}
  :post! #(api/create-rating! (get-conn %) index-name dataset-id (get-user %) params)
  :handle-ok #(api/get-rating (get-db %) index-name dataset-id (get-user %)))

(defresource average-rating [{:keys [dataset-id index-name]}] defaults
  :handle-ok #(api/get-average-rating (get-db %) index-name dataset-id))

(def resources
  {:status status
   :categories categories
   :seed seed
   :seed-datasets seed-datasets
   :seed-subscriptions seed-subscriptions
   :subscription subscription
   :subscriptions subscriptions
   :dataset dataset
   :datasets datasets
   :average-rating average-rating
   :rating rating
   :refresh-index refresh-index
   :indices indices
   :mappings mappings
   :formats formats
   :tags tags
   :vendors vendors
   :vendor vendor
   :default default})
