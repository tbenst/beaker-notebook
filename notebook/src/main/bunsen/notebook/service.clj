(ns bunsen.notebook.service
  (:gen-class)
  (:require [environ.core :refer [env]]
            [bunsen.notebook.helper.json :as json]
            [bunsen.common.helper.utils :as u]
            [com.stuartsierra.component :as component]
            [bunsen.common.component.database :refer [database]]
            [bunsen.notebook.component.server :refer [server]]))

(defn service [config]
  (json/enable-date-serialization)
  (-> (component/system-map
        :database (database (assoc config :seed-readers {'file u/read-resource-file}))
        :server (component/using
                  (server config)
                  {:database :database}))))

(defn -main [& args]
  (component/start
    (service {:server-port (Integer. (:notebook-port env))
              :seed-file (:notebook-seed-file env)
              :cookie-salt (:cookie-salt env)
              :database-uri (:notebook-database-uri env)})))
