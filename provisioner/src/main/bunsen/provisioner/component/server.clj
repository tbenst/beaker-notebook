(ns bunsen.provisioner.component.server
  (:require [bidi.ring :refer [make-handler]]
            [bidi.bidi :refer [compile-route]]
            [ring.util.response :refer [response status]]
            [ring.adapter.jetty :refer [run-jetty]]
            [ring.middleware.json :refer [wrap-json-params]]
            [ring.middleware.session :refer [wrap-session]]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            [ring.middleware.stacktrace :refer [wrap-stacktrace-log]]
            [ring.middleware.cookies :refer [wrap-cookies]]
            [bunsen.common.middleware.database :refer [wrap-database]]
            [clojure.algo.generic.functor :refer [fmap]]
            [com.stuartsierra.component :as component :refer [start stop]]
            [bunsen.provisioner.route :refer [routes]]
            [bunsen.common.helper.session.store :refer [bunsen-cookie-store]]
            [bunsen.provisioner.resource :refer [resources]]
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
                        wrap-keyword-params
                        (wrap-database config database)
                        wrap-stacktrace-log
                        wrap-json-params
                        wrap-cookies
                        (kerberos/authenticate principal))]
        (assoc server
               :jetty (run-jetty
                        handler (:jetty-options config))))))

  (stop [server]
    (when-let [jetty (:jetty server)]
      (.stop jetty))
    (dissoc server :jetty)))

(defn server [config]
  (map->Server {:config config}))
