(ns bunsen.provisioner.service
  (:gen-class)
  (:require [environ.core :refer [env]]
            [clojure.data.json :as json]
            [com.stuartsierra.component :as component]
            [bunsen.provisioner.component.server :refer [server]]))

(defn service [config]
  (-> (component/system-map
        :server (server config))))

(defn -main [& args]
  (component/start
    (service
      {:server-port (Integer. (:provisioner-port env))
       :docker-url (:docker-url env)
       :marathon-url (:marathon-url env)
       :app-group (:app-group env)
       :app-defaults (json/read-str (or (:app-defaults env) "{}"))
       :container-port (:provisioner-default-container-port env)
       :container-image (:provisioner-default-container-image env)
       :container-prefix (:provisioner-default-container-prefix env)
       :local-username (:provisioner-local-username env)
       :local-password-path (:provisioner-local-password-path env)
       :lifecycle-strategy (keyword (:provisioner-lifecycle-strategy env))})))
