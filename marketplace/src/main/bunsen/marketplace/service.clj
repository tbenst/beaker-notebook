(ns bunsen.marketplace.service
  (:gen-class)
  (:require [environ.core :refer [env]]
            [com.stuartsierra.component :as component]
            [bunsen.common.helper.json :as json]
            (bunsen.common.component [server :refer [server]]
                                     [database :refer [database]])
            [bunsen.marketplace.config :refer [config]]
            (bunsen.marketplace.component [handler :refer [handler]]
                                          [elasticsearch :refer [elasticsearch]])))

(defn service [env]
  (json/enable-date-serialization)
  (json/enable-uuid-json-serialization)
  (component/system-map
    :database (database (config env))
    :elasticsearch (elasticsearch (config env))
    :handler (component/using
               (handler (config env)) [:database :elasticsearch])
    :server (component/using
              (server (config env)) [:handler])))

(defn -main [& args]
  (component/start (service env)))
