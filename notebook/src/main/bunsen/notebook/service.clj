(ns bunsen.notebook.service
  (:gen-class)
  (:require [environ.core :refer [env]]
            [bunsen.notebook.helper.json :as json]
            [com.stuartsierra.component :as component]
            [bunsen.notebook.component.database :refer [database]]
            [bunsen.notebook.component.server :refer [server]]))

(defn service [config]
  (json/enable-date-serialization)
  (-> (component/system-map
        :database (database config)
        :server (component/using
                  (server config)
                  {:database :database}))))

(defn -main [& args]
  (component/start
    (service {:server-port (Integer. (:notebook-port env))
              :seed-file (:notebook-seed-file env)
              :database-uri (:notebook-database-uri env)})))
