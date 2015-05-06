(ns bunsen.notebook.component.server
  (:require [ring.adapter.jetty :refer [run-jetty]]
            [com.stuartsierra.component :as component :refer [start stop]]
            [ring.middleware.json :refer [wrap-json-params]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.util.response :refer [response]]
            [bunsen.common.middleware.database :refer [wrap-database]]
            [bunsen.common.helper.session.store :refer [bunsen-cookie-store]]
            [bunsen.notebook.helper.route :as route]
            [bunsen.notebook.route :as api-route]
            [bunsen.notebook.resource.default :refer [default]]
            [bunsen.notebook.resource.status :refer [status]]
            [bunsen.notebook.resource.seed :refer [seed]]
            [bunsen.notebook.resource.publication :refer [publication]]
            [bunsen.notebook.resource.notebook :refer [notebook]]
            [bunsen.notebook.resource.publications :refer [publications]]
            [bunsen.notebook.resource.publications-count :refer [publications-count]]
            [bunsen.notebook.resource.category :refer [category]]
            [bunsen.notebook.resource.categories :refer [categories]]
            [bunsen.notebook.resource.rating :refer [rating]]
            [bunsen.notebook.resource.ratings :refer [ratings]]
            [datomic.api :as d]))

(def routes
  (route/with-default
    :default api-route/routes))

(def resources
  {:status status
   :publication publication
   :publications publications
   :publications-count publications-count
   :notebook notebook
   :category category
   :categories categories
   :rating rating
   :ratings ratings
   :seed seed
   :default default})

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
                                     (wrap-session {:store (bunsen-cookie-store (:cookie-salt config))
                                                    :cookie-name "session"})
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
