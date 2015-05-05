(ns bunsen.provisioner.service
  (:gen-class)
  (:require [environ.core :refer [env]]
            [clojure.data.json :as json]
            [com.stuartsierra.component :as component]
            [bunsen.common.component.database :refer [database]]
            [bunsen.provisioner.component.server :refer [server]]))

(defn service [config]
  (-> (component/system-map
        :database (database config)
        :server (component/using
                  (server config)
                  {:database :database}))))

(defn -main [& args]
  (component/start
    (service
      {:server-port (Integer. (:provisioner-port env))
       :cookie-salt (:cookie-salt env)
       :database-uri (:provisioner-database-uri env)
       :docker-url (:docker-url env)
       :marathon-url (:marathon-url env)
       :bamboo-host (:bamboo-host env)
       :hostname (:hostname env)
       :app-group (:app-group env)
       :app-defaults (json/read-str (or (:app-defaults env) "{}"))
       :container-path (:provisioner-default-container-path env)
       :container-port (:provisioner-default-container-port env)
       :container-image (:provisioner-default-container-image env)
       :container-prefix (:provisioner-default-container-prefix env)
       :local-cookie-path (:provisioner-local-cookie-path env)
       :scratch-space-root (:scratch-space-root env)
       :beakerauth-token (:beakerauth-token env)
       :lifecycle-strategy (keyword (:provisioner-lifecycle-strategy env))
       :use-kerberos (let [kerberosprincipal (:kerberos-principal env)]
   		        (if kerberosprincipal
		          true false))
       :kerberos-principal (:kerberos-principal env)
       :jetty-options (let [keystore (:ssl-keystore env)
   		            keystore-pass (:ssl-keystore-pass env)]
                        (if-not (and keystore keystore-pass)
                        {:port (Integer. (:provisioner-port env))
		         :ssl? false
		         :join? false}
		        {:ssl? true
		         :port (+ (Integer. (:provisioner-port env)) 1)
		         :ssl-port (Integer. (:provisioner-port env))
		         :keystore (:ssl-keystore env)
		         :key-password (:ssl-keystore-pass env)
		         :join? false}))})))
