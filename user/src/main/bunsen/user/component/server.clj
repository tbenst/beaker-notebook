(ns bunsen.user.component.server
  (:require [bidi.ring :refer [make-handler]]
            [bidi.bidi :refer [compile-route]]
            [ring.util.response :refer [response status]]
            [ring.adapter.jetty :refer [run-jetty]]
            [ring.middleware.json :refer [wrap-json-params]]
            [ring.middleware.session :refer [wrap-session]]
            [ring.middleware.cookies :refer [wrap-cookies]]
            [ring.middleware.stacktrace :refer [wrap-stacktrace-log]]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            [bunsen.common.middleware.database :refer [wrap-database]]
            [clojure.algo.generic.functor :refer [fmap]]
            [com.stuartsierra.component :as component :refer [start stop]]
            [bunsen.user.route :refer [routes]]
            [bunsen.common.helper.session.store :refer [bunsen-cookie-store]]
            [bunsen.user.resource :refer [resources]]))

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
            handler (-> (compile-route
                          (with-default-route routes ::not-found))
                        (make-handler
                          ;; defresource returns a function that returns a handler... call it here to pass config
                          (-> (fmap #(% config) resources)
                              (assoc ::not-found not-found)))
                        (wrap-session {:store (bunsen-cookie-store (:cookie-salt config))
                                       :cookie-name "session"
                                       :cookie-attrs {:http-only false}})
                        wrap-keyword-params
                        wrap-json-params
                        (wrap-database database)
                        wrap-stacktrace-log
                        wrap-cookies)]
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
