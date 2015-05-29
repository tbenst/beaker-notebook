(ns bunsen.notebook.service
  (:gen-class)
  (:require [environ.core :refer [env]]
            [bunsen.common.helper.json :as j]
            [bunsen.common.helper.utils :as u]
            [com.stuartsierra.component :as component]
            (bunsen.common.component [server :refer [server]]
                                     [database :refer [database]])
            [bunsen.notebook.component.handler :refer [handler]]))

(defn service [config]
  (j/enable-date-serialization)
  (j/enable-uuid-json-serialization)
  (component/system-map
    :database (database config)
    :handler (component/using
               (handler config) [:database])
    :server (component/using
              (server config) [:handler])))

(defn -main [& args]
  (component/start
    (service {:allow-seed (:allow-seed env)
              :cookie-salt (:cookie-salt env)
              :seed-file (:notebook-seed-file env)
              :seed-readers {'file u/read-resource-file}
              :database-uri (:notebook-database-uri env)
              :kerberos? (boolean (:kerberos-principal env))
              :kerberos-principal (:kerberos-principal env)
              :jetty-options (let [keystore (:ssl-keystore env)
                                   keystore-pass (:ssl-keystore-pass env)]
                               (if-not (and keystore keystore-pass)
                                 {:port (Integer. (:notebook-port env))
                                  :ssl? false
                                  :join? false}
                                 {:ssl? true
                                  :port (+ (Integer. (:notebook-port env)) 1)
                                  :ssl-port (Integer. (:notebook-port env))
                                  :keystore (:ssl-keystore env)
                                  :key-password (:ssl-keystore-pass env)
                                  :join? false}))})))
