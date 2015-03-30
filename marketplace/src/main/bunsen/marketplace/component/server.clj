(ns bunsen.marketplace.component.server
  (:require [ring.adapter.jetty :refer [run-jetty]]
            [com.stuartsierra.component :as component :refer [start stop]]
            [ring.middleware.json :refer [wrap-json-body]]
            [ring.middleware.cookies :refer [wrap-cookies]]
            [ring.middleware.session :refer [wrap-session]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            [ring.util.response :refer [response]]
            [bidi.ring :refer (make-handler)]
            [bunsen.marketplace.component.bunsen-cookie-store :refer [bunsen-cookie-store]]
            [bunsen.marketplace.api.resource :as api-resource]
            [bunsen.marketplace.api.route :as api-route]))

(def resources
  {:status api-resource/status
   :categories api-resource/categories
   :datasets api-resource/datasets
   :dataset api-resource/dataset
   :refresh api-resource/refresh
   :counts api-resource/counts
   :indices api-resource/indices
   :mappings api-resource/mappings
   :formats api-resource/formats
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
               :jetty (run-jetty (-> handler
                                     (wrap-session {:store (bunsen-cookie-store (:cookie-salt config))
                                                    :cookie-name "session"})
                                      wrap-cookies
                                      wrap-keyword-params
                                      wrap-params
                                      (wrap-json-body {:keywords? true}))
                                 {:join? false
                                  :port (:server-port config)})))))

  (stop [server]
    (when-let [jetty (:jetty server)]
      (.stop jetty))
    (dissoc server :jetty)))

(defn server [] (map->Server {}))
