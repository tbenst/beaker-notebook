(ns bunsen.publications.service
  (:gen-class)
  (:require [environ.core :refer [env]]
            [com.stuartsierra.component :as component]
            [bunsen.publications.component.server :refer [server]]))

(defn service [config]
  (-> (component/system-map
        :server (component/using
                  (server config)))))

(defn -main [& args]
  (component/start
    (service {:server-port (Integer. (:publications-port env))})))
