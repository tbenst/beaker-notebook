(ns bunsen.common.component.service
  (:require [ring.middleware.json :refer [wrap-json-body wrap-json-params]]
            [ring.middleware.cookies :refer [wrap-cookies]]
            [ring.middleware.session :refer [wrap-session]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            [ring.middleware.multipart-params :refer [wrap-multipart-params]]
            [bunsen.common.middleware.with :refer [wrap-with]]
            [bunsen.common.middleware.logger :refer [wrap-logger]]
            [bunsen.common.middleware.kerberos :as kerberos]
            [bunsen.common.middleware.session.cookie :refer [cookie-store]]
            [com.stuartsierra.component :as component :refer [Lifecycle]]))

(defrecord Service [config services]
  Lifecycle

  (component/start
    [service]
    (if (:handler service)
      service
      (assoc service
             :handler (-> services
                          :handler
                          (wrap-session
                            {:store (cookie-store
                                      (:cookie-salt config))
                             :cookie-name "session"
                             :cookie-attrs {:http-only false}})
                          wrap-cookies
                          wrap-keyword-params
                          wrap-multipart-params
                          wrap-params
                          wrap-json-params
                          (wrap-with :config config)
                          (kerberos/authenticate
                            (when (:kerberos? config)
                              (:kerberos-principal config)))
                          wrap-logger))))

  (component/stop
    [service]
    (dissoc service :handler)))

(defn service [config]
  (map->Service {:config config}))
