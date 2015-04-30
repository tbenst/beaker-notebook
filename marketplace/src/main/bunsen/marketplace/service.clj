(ns bunsen.marketplace.service
  (:gen-class)
  (:require [environ.core :refer [env]]
            [com.stuartsierra.component :as component]
            [bunsen.common.helper.json :as json]
            [bunsen.common.component.database :refer [database]]
            (bunsen.marketplace.component [config :refer [config]]
                                          [server :refer [server]])))

(defn service [env]
  (json/enable-uuid-json-serialization)
  (-> (component/system-map
        :database (database (config env))
        :server (component/using
                  (server (config env))
                  {:database :database}))))

(defn -main [& args]
  (component/start (service env)))
