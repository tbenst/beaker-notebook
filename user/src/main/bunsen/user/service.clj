(ns bunsen.user.service
  (:gen-class)
  (:require [environ.core :refer [env]]
            [com.stuartsierra.component :as component]
            [crypto.password.bcrypt :as password]
            [bunsen.common.component.database :refer [database]]
            [bunsen.common.helper.json :as j]
            [bunsen.user.component.server :refer [server]]))

(defn service [config]
  (j/enable-uuid-json-serialization)
  (-> (component/system-map
        :database (database (assoc config :seed-readers {'bcrypt password/encrypt}))
        :server (component/using
                  (server config)
                  {:database :database}))))

(defn -main [& args]
  (component/start
    (service
      {:server-port (Integer. (:user-port env))
       :database-uri (:user-database-uri env)
       :seed-file (:user-seed-file env)
       :allow-seed (:allow-seed env)
       :cookie-salt (:cookie-salt env)
       :use-kerberos (let [kerberosprincipal (:kerberos-principal env)]
   		        (if kerberosprincipal
		          true false))
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

