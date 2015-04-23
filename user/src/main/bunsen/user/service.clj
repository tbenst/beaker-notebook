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
       :cookie-salt (:cookie-salt env)})))
