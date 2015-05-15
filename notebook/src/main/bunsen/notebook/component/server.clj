(ns bunsen.notebook.component.server
  (:require [bidi.ring :refer [make-handler]]
            [bidi.bidi :refer [compile-route]]
            [ring.util.response :refer [response status]]
            [ring.adapter.jetty :refer [run-jetty]]
            [com.stuartsierra.component :as component :refer [start stop]]
            [ring.middleware.json :refer [wrap-json-params]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            [bunsen.common.middleware.database :refer [wrap-database wrap-database-reconnect]]
            [bunsen.common.helper.session.store :refer [bunsen-cookie-store]]
            [ring.middleware.session :refer [wrap-session]]
            [ring.middleware.stacktrace :refer [wrap-stacktrace-log]]
            [clojure.algo.generic.functor :refer [fmap]]
            [bunsen.notebook.resource :refer [resources]]
            [bunsen.notebook.route :refer [routes]]
            [datomic.api :as d]
            [bunsen.common.helper.kerberos :as kerberos]))

(def not-found
  (constantly
    (-> "" response (status 404))))

(defn with-default-route
  "Add a route pattern that will match anything. This way, we can handle the 404 (not Jetty)."
  [routes default]
  [""
   [routes
    [#".*" default]]])

(defn conditionally-wrap-database [handler config database]
  (if (= "true" (:allow-seed config))
    (wrap-database-reconnect handler config)
    (wrap-database handler database)))

(defrecord Server [config database]
  component/Lifecycle

  (start [server]
    (if (:jetty server)
      server
      (let [port (:server-port config)
            salt (:cookie-salt config)
            principal (if (:use-kerberos config) (:kerberos-principal config) nil)
            handler (-> (compile-route
                          (with-default-route routes ::not-found))
                        (make-handler
                          ;; defresource returns a function that returns a handler... call it here to pass config
                          (-> (fmap #(% config) resources)
                              (assoc ::not-found not-found)))
                        (wrap-session {:store (bunsen-cookie-store (:cookie-salt config))
                                       :cookie-name "session"})
                        wrap-params
                        wrap-keyword-params
                        wrap-json-params
                        (conditionally-wrap-database config database)
                        wrap-stacktrace-log
                        (kerberos/authenticate principal))]
        (assoc server
               :jetty (run-jetty
                        handler {:port port
                                 :join? false})))))

  (stop [server]
    (when-let [jetty (:jetty server)]
      (.stop jetty))
    (dissoc server :jetty)))

(defn server [config]
  (map->Server {:config config}))
