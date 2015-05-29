(ns bunsen.user.service
  (:gen-class)
  (:require [environ.core :refer [env]]
            [crypto.password.bcrypt :as password]
            [com.stuartsierra.component :as component]
            [bunsen.common.helper.json :as j]
            [bunsen.common.component.server :refer [server]]
            [bunsen.common.component.database :refer [database]]
            [bunsen.user.component.handler :refer [handler]]))

(defn service [config]
  (j/enable-uuid-json-serialization)
  (component/system-map
    :database (database config)
    :handler (component/using
               (handler config) [:database])
    :server (component/using
              (server config) [:handler])))

(defn -main [& args]
  (component/start
    (service
      {:server-port (Integer. (:user-port env))
       :database-uri (:user-database-uri env)
       :seed-file (:user-seed-file env)
       :seed-readers {'bcrypt password/encrypt}
       :allow-seed (:allow-seed env)
       :cookie-salt (:cookie-salt env)
       :kerberos? (boolean (:kerberos-principal env))
       :kerberos-principal (:kerberos-principal env)
       :jetty-options (let [keystore (:ssl-keystore env)
                            keystore-pass (:ssl-keystore-pass env)]
                        (if-not (and keystore keystore-pass)
                          {:port (Integer. (:user-port env))
                           :ssl? false
                           :join? false}
                          {:ssl? true
                           :port (+ (Integer. (:user-port env)) 1)
                           :ssl-port (Integer. (:user-port env))
                           :keystore (:ssl-keystore env)
                           :key-password (:ssl-keystore-pass env)
                           :join? false}))})))
