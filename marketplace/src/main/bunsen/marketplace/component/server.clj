(ns bunsen.marketplace.component.server
  (:require [ring.adapter.jetty :refer [run-jetty]]
            [com.stuartsierra.component :as component :refer [start stop]]
            [ring.middleware.json :refer [wrap-json-body]]
            [ring.middleware.cookies :refer [wrap-cookies]]
            [ring.middleware.session :refer [wrap-session]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.middleware.stacktrace :refer [wrap-stacktrace-log]]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            [ring.util.response :refer [response]]
            [bidi.ring :refer (make-handler)]
            [bunsen.common.middleware.database :refer [wrap-database wrap-database-reconnect]]
            [bunsen.common.helper.session.store :refer [bunsen-cookie-store]]
            [bunsen.marketplace.api.resource :as api-resource]
            [bunsen.marketplace.api.route :as api-route]
            [bunsen.common.helper.kerberos :as kerberos]))

(def resources
  {:status api-resource/status
   :categories api-resource/categories
   :seed-datasets api-resource/seed-datasets
   :seed-subscriptions api-resource/seed-subscriptions
   :subscription api-resource/subscription
   :subscriptions api-resource/subscriptions
   :dataset api-resource/dataset
   :datasets api-resource/datasets
   :refresh api-resource/refresh
   :counts api-resource/counts
   :indices api-resource/indices
   :mappings api-resource/mappings
   :formats api-resource/formats
   :tags api-resource/tags
   :vendors api-resource/vendors
   :default api-resource/default})

(defn conditionally-wrap-database [handler config database]
  (if (= "true" (:allow-seed config))
    (wrap-database-reconnect handler config)
    (wrap-database handler database)))

(defrecord Server [config database]
  component/Lifecycle
  (start [server]
    (if (:jetty server)
      server
      (let [principal (if (:use-kerberos config) (:kerberos-principal config) nil)
            handler (make-handler
                      api-route/routes
                      #(let [resource (% resources)]
                         (fn [request]
                           ((resource config (:route-params request)) request))))]

        (assoc server
               :jetty (run-jetty (-> handler
                                     (wrap-session {:store (bunsen-cookie-store (:cookie-salt config))
                                                    :cookie-name "session"})
                                     wrap-cookies
                                     wrap-keyword-params
                                     wrap-params
                                     (conditionally-wrap-database config database)
                                     wrap-stacktrace-log
                                     (wrap-json-body {:keywords? true})
                                     (kerberos/authenticate principal))
                                 (:jetty-options config))))))

  (stop [server]
    (when-let [jetty (:jetty server)]
      (.stop jetty))
    (dissoc server :jetty)))

(defn server [config] (map->Server {:config config}))
