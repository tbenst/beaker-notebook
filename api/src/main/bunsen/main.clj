(ns bunsen.main
  (:gen-class)
  (:require [environ.core :refer [env]]
            [com.stuartsierra.component :as component]
            [bunsen.common.helper.json]
            [bunsen.user.component.service :as user]
            [bunsen.notebook.component.service :as notebook]
            [bunsen.provisioner.component.service :as provisioner]
            [bunsen.marketplace.component.service :as marketplace]
            (bunsen.common.component [jetty :refer [jetty]]
                                     [datomic :refer [datomic]]
                                     [services :refer [services]]
                                     [elasticsearch :refer [elasticsearch]])))

(defn config
  [config]
  (-> (merge env config)
      (update-in [:jetty-http-port] #(and % (Integer. %)))
      (update-in [:jetty-https-port] #(and % (Integer. %)))
      (update-in [:elasticsearch-port] #(and % (Integer. %)))
      (update-in [:lifecycle-strategy] #(and % (keyword %)))
      (as-> c
        (assoc c :kerberos? (boolean
                              (:kerberos-principal c)))
        (assoc c :allow-seed? (= "true" (:allow-seed c))))))

(defn system
  [config]
  (-> (component/system-map
        :jetty (jetty config)
        :datomic (datomic config)
        :elasticsearch (elasticsearch config)
        :services (services)
        :user-service (user/service config)
        :notebook-service (notebook/service config)
        :provisioner-service (provisioner/service config)
        :marketplace-service (marketplace/service config))
      (component/system-using
        {:jetty {:service :services}
         :services [:user-service
                    :notebook-service
                    :provisioner-service
                    :marketplace-service]
         :user-service [:datomic]
         :notebook-service [:datomic]
         :provisioner-service [:datomic]
         :marketplace-service [:datomic :elasticsearch]})))

(defn -main
  [& args]
  (-> {} config system))
