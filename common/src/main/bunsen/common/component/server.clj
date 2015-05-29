(ns bunsen.common.component.server
  "Common server (jetty) component."
  (:require [ring.adapter.jetty :refer [run-jetty]]
            [ring.middleware.json :refer [wrap-json-body wrap-json-params]]
            [ring.middleware.cookies :refer [wrap-cookies]]
            [ring.middleware.session :refer [wrap-session]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            [com.stuartsierra.component :as component :refer [start stop]]
            [bunsen.common.middleware.with :refer [wrap-with]]
            [bunsen.common.middleware.logger :refer [wrap-logger]]
            [bunsen.common.helper.kerberos :as kerberos]
            [bunsen.common.helper.session.store :refer [bunsen-cookie-store]]))

(defrecord Server [config handler]
  component/Lifecycle
  (start [server]
    (if (:jetty server)
      server
      (assoc server
             :jetty (run-jetty
                      (-> handler
                          :fn
                          (wrap-session
                            {:store (bunsen-cookie-store
                                      (:cookie-salt config))
                             :cookie-name "session"
                             :cookie-attrs {:http-only false}})
                          wrap-cookies
                          wrap-keyword-params
                          wrap-params
                          wrap-json-params
                          (wrap-with :config config)
                          (kerberos/authenticate
                            (when (:kerberos? config)
                              (:kerberos-principal config)))
                          wrap-logger)
                      (:jetty-options config)))))

  (stop [server]
    (when-let [jetty (:jetty server)]
      (.stop jetty))
    (dissoc server :jetty)))

(defn server [config] (map->Server {:config config}))
