(ns bunsen.marketplace.component.server
  (:require [ring.adapter.jetty :refer [run-jetty]]
            [com.stuartsierra.component :as component :refer [start stop]]

            [ring.middleware.json :refer [wrap-json-params]]
            [ring.util.response :refer [response]]
            [bidi.ring :refer (make-handler)]
            [bunsen.marketplace.api.resource :as api-resource]
            [bunsen.marketplace.api.route :as api-route]))

(def resources
  {:status api-resource/status
   :categories api-resource/categories
   :datasets api-resource/datasets
   :refresh api-resource/refresh
   :counts api-resource/counts
   :indices api-resource/indices
   :mappings api-resource/mappings
   :default api-resource/default})

(defrecord Server [config]
  component/Lifecycle

  (start [server]
    (if (:jetty server)
      server
      (let [handler (make-handler
                     api-route/routes
                     #(let [resource (% resources)]
                        (fn [request]
                          ((resource config (:route-params request)) request))))]

        (assoc server
               :jetty (run-jetty (wrap-json-params handler) {:join? false
                                                             :port (:server-port config)})))))

  (stop [server]
    (when-let [jetty (:jetty server)]
      (.stop jetty))
    (dissoc server :jetty)))

(defn server [] (map->Server {}))
