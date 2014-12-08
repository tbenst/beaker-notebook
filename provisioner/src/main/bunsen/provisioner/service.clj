(ns bunsen.provisioner.service
  (:gen-class)
  (:require [environ.core :refer [env]]
            [com.stuartsierra.component :as component]
            [bunsen.provisioner.helper.cli :refer [parse-args]]
            (bunsen.provisioner.component [config :refer [config]]
                                          [server :refer [server]])))

(defn service [env]
  (-> (component/system-map
        :server (server)
        :config (config env))
      (component/system-using
        {:server [:config]})))

(defn -main [& args]
  (when-let [args (parse-args args)]
    (component/start (service (merge env args)))))
