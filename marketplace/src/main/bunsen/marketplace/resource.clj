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
   :available-media-types #{"text/plain" "application/json"}
   :handle-exception #(-> % :exception throw)})

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

(defresource seed-datasets [_] restricted-read-defaults
  :allowed-methods #{:post}
  :processable? #(let [body (get-body %)]
                   (api/create-datasets! (get-es %) (:indexName body) (:datasets body))))

(defresource seed-subscriptions [_] restricted-read-defaults
  :allowed-methods #{:delete}
  :delete! #(api/retract-subscriptions! (get-conn %)))

(defresource categories [_] restricted-write-defaults
  :allowed-methods #{:get :post}
  :handle-ok #(api/find-categories (get-es %) (get-params %))
  :post! #(let [body (get-body %)]
            (api/create-categories! (get-es %) (:indexName body) (:categories body))))

(defresource datasets [{:keys [index-name] :as params}] restricted-write-defaults
  :exists? #(api/index-exists? (get-es %) index-name)
  :allowed-methods #{:get :post}
  :post! #(api/create-dataset! (get-es %) index-name (get-body %))
  :handle-ok #(api/find-datasets
                (get-db %) (get-es %) index-name (dissoc params :index-name)))

(defresource dataset [{:keys [index-name dataset-id]}] restricted-write-defaults
  :exists? #(api/index-exists? (get-es %) index-name)
  :allowed-methods #{:get :put :delete}
  :delete! #(api/retract-dataset! (get-es %) index-name dataset-id)
  :put! #(api/update-dataset! (get-es %) index-name dataset-id (get-body %))
  :handle-ok #(api/get-dataset (get-db %) (get-es %) index-name dataset-id))

(defresource mappings [_] restricted-read-defaults
  :allowed-methods #{:put}
  :put! #(api/update-dataset-mappings! (get-es %) (:indexName (get-body %))))

(defresource indices [_] restricted-read-defaults
  :allowed-methods #{:get :post}
  :handle-ok #(api/list-indices (get-es %))
  :post! #(api/create-index! (get-es %) (:indexName (get-body %))))

(defresource refresh-index [_] restricted-read-defaults
  :allowed-methods #{:put}
  :put! #(api/refresh-index! (get-es %) (:indexName (get-body %))))

(defresource formats [_] restricted-read-defaults
  :handle-ok #(api/list-formats (get-es %)))

(defresource tags [_] restricted-read-defaults
  :handle-ok #(api/list-tags (get-es %)))

(defresource vendors [_] restricted-read-defaults
  :allowed-methods #{:get :post}
  :processable? (some-fn get? (complement
                                #(api/vendor-exists? (get-db %) (:name (get-body %)))))
  :handle-unprocessable-entity {:mesage "Vendor Exists"}
  :post! #(api/create-vendor! (get-conn %) (get-body %))
  :handle-ok #(api/list-vendors (get-db %)))

(defresource vendor [{:keys [vendor-id]}] restricted-read-defaults
  :allowed-methods #{:delete :put}
  :delete! #(api/delete-vendor! (get-conn %) vendor-id)
  :put! (fn [ctx]
          {::vendor (api/update-vendor! (get-conn ctx)
                                        vendor-id
                                        (get-body ctx))})
  :handle-created ::vendor)

(defresource subscription [{:keys [index-name dataset-id]}] defaults
  :allowed-methods #{:post :put :delete}
  :put! #(api/create-subscription! (get-conn %) index-name dataset-id (get-user %))
  :delete! #(api/retract-subscription! (get-conn %) index-name dataset-id (get-user %)))

(defresource subscriptions [_] defaults
  :allowed-methods #{:get}
  :handle-ok #(api/list-subscriptions (get-db %) (get-es %) (get-user %)))

(defresource rating [{:keys [dataset-id index-name]}] defaults
  :allowed?  #(or (get? %)
                  (api/subscribed? (get-db %) index-name dataset-id (get-user %)))
  :allowed-methods #{:get :post}
  :post! #(api/create-rating! (get-conn %) index-name dataset-id (get-user %) (get-body %))
  :handle-ok #(api/get-rating (get-db %) index-name dataset-id (get-user %)))

(defresource average-rating [{:keys [dataset-id index-name]}] defaults
  :handle-ok #(api/get-average-rating (get-db %) index-name dataset-id))
