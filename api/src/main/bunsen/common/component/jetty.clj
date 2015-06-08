(ns bunsen.common.component.jetty
  (:require [ring.adapter.jetty :refer [run-jetty]]
            [ring.middleware.json :refer [wrap-json-body wrap-json-params]]
            [ring.middleware.cookies :refer [wrap-cookies]]
            [ring.middleware.session :refer [wrap-session]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            [ring.middleware.multipart-params :refer [wrap-multipart-params]]
            [bunsen.common.middleware.with :refer [wrap-with]]
            [bunsen.common.middleware.logger :refer [wrap-logger]]
            [bunsen.common.middleware.kerberos :as kerberos]
            [bunsen.common.middleware.session.cookie :refer [cookie-store]]
            [com.stuartsierra.component :as component :refer [start stop]]))

(defn options
  [{:keys [jetty-http-port
           jetty-https-port
           ssl-keystore
           ssl-keystore-pass]}]
  (if-not (and jetty-https-port ssl-keystore ssl-keystore-pass)
    {:ssl? false
     :join? false
     :port jetty-http-port}
    {:ssl? true
     :join? false
     :port jetty-http-port
     :ssl-port jetty-https-port
     :keystore ssl-keystore
     :key-password ssl-keystore-pass}))

(defrecord Jetty [config service]
  component/Lifecycle

  (start [jetty]
    (if (:server jetty)
      jetty
      (assoc jetty
             :server (run-jetty (:handler service) (options config)))))

  (stop [jetty]
    (when-let [server (:server jetty)]
      (.stop server))
    (dissoc jetty :server)))

(defn jetty [config]
  (map->Jetty {:config config}))
