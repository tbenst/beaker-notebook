(ns bunsen.provisioner.component.server
  (:require [ring.adapter.jetty :refer [run-jetty]]
            [com.stuartsierra.component :as component :refer [start stop]]

            [ring.middleware.json :refer [wrap-json-params]]
            [ring.util.response :refer [response]]
            [bunsen.provisioner.helper.route :as route]
            [bunsen.provisioner.route.api :as api-route]
            [bunsen.provisioner.resource.api :as api-resource]))

(def routes
  (route/with-default
    :default api-route/routes))

(def resources
  {:status api-resource/status
   :instance api-resource/instance
   :instances api-resource/instances
   :default api-resource/default})

(defrecord Server [config]
  component/Lifecycle

  (start [server]
    (if (:jetty server)
      server
      (let [handler (route/make-handler
                      #(let [resource (% resources)]
                         (fn [request]
                           ((resource server (:route-params request)) request)))
                      routes)]
        (assoc server
               :jetty (run-jetty (wrap-json-params handler) {:join? false
                                                             :port (:server-port config)})))))

  (stop [server]
    (when-let [jetty (:jetty server)]
      (.stop jetty))
    (dissoc server :jetty)))

(defn server [] (map->Server {}))
