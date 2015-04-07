(ns bunsen.user.service
  (:gen-class)
  (:require [environ.core :refer [env]]
            [clojure.data.json :as json]
            [com.stuartsierra.component :as component]
            [bunsen.user.component.server :refer [server]]))

(defn service [config]
  (-> (component/system-map
        :server (server config))))

(defn -main [& args]
  (component/start
    (service
      {:server-port (Integer. (:user-port env))})))
