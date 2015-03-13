(ns bunsen.publications.service
  (:gen-class)
  (:require [environ.core :refer [env]]
            [com.stuartsierra.component :as component]
            [bunsen.publications.component.database :refer [database]]
            [bunsen.publications.component.server :refer [server]]))

(defn service [config]
  (-> (component/system-map
        :database (database config)
        :server (component/using
                  (server config)
                  {:database :database}))))

(defn -main [& args]
  (component/start
    (service {:server-port (Integer. (:publications-port env))
              :database-uri (:publications-database-uri env)})))
