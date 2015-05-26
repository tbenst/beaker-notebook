(ns bunsen.marketplace.service
  (:gen-class)
  (:require [environ.core :refer [env]]
            [com.stuartsierra.component :as component]
            [bunsen.common.helper.json :as json]
            [bunsen.common.component.database :refer [database]]
            [bunsen.marketplace.config :refer [config]]
            (bunsen.marketplace.component [server :refer [server]]
                                          [elasticsearch :refer [elasticsearch]])))

(defn service [env]
  (json/enable-date-serialization)
  (json/enable-uuid-json-serialization)
  (component/system-map
    :database (database (config env))
    :elasticsearch (elasticsearch (config env))
    :server (component/using
              (server (config env))
              {:database :database
               :elasticsearch :elasticsearch})))

(defn -main [& args]
  (component/start (service env)))
