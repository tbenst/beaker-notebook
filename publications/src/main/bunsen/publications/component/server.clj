(ns bunsen.publications.component.server
  (:require [ring.adapter.jetty :refer [run-jetty]]
            [com.stuartsierra.component :as component :refer [start stop]]
            [ring.middleware.json :refer [wrap-json-params]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.util.response :refer [response]]
            [bunsen.publications.helper.route :as route]
            [bunsen.publications.route :as api-route]
            [bunsen.publications.resource.default :refer [default]]
            [bunsen.publications.resource.status :refer [status]]
            [bunsen.publications.resource.seed :refer [seed]]
            [bunsen.publications.resource.publication :refer [publication]]
            [bunsen.publications.resource.publications :refer [publications]]
            [bunsen.publications.resource.publications-count :refer [publications-count]]
            [bunsen.publications.resource.category :refer [category]]
            [bunsen.publications.resource.categories :refer [categories]]
            [datomic.api :as d]))

(def routes
  (route/with-default
    :default api-route/routes))

(def resources
  {:status status
   :publication publication
   :publications publications
   :publications-count publications-count
   :category category
   :categories categories
   :seed seed
   :default default})

(defn wrap-database [handler database]
  (fn [req]
    (let [uri (:uri database)
          conn (d/connect uri)
          db (d/db conn)
          request (assoc req
                    :db db
                    :conn conn
                    :db-uri uri)]
      (handler request))))

(defrecord Server [config database]
  component/Lifecycle

  (start [server]
         (if (:jetty server)
           server
           (let [handler (route/make-handler
                           #(let [resource (% resources)]
                              (fn [req]
                                ((resource server (:route-params req)) req)))
                           routes)
                 wrapped-handler (-> handler
                                     wrap-json-params
                                     wrap-params
                                     (wrap-database database))]
             (assoc server
               :jetty (run-jetty wrapped-handler {:join? false
                                                  :port (:server-port config)})))))

  (stop [server]
        (when-let [jetty (:jetty server)]
          (.stop jetty))
        (dissoc server :jetty)))

(defn server [config]
  (map->Server {:config config}))
