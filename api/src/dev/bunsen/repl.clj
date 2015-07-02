(ns bunsen.repl
  (:require [bunsen.main :as bunsen]
            [hawk.core :as hawk]
            [com.stuartsierra.component :as component]
            (clojure.tools.namespace [file :refer [read-file-ns-decl]]
                                     [repl :refer [refresh refresh-all]])))

(def config
  {:allow-seed "true"
   :cookie-salt "r8T`628DaW90*?30)3qRx,2f8h?8(wG13:64K3=w00-8W7g962gM268D0lTS(Uq;^v15mY3gCj-u59k994_/@}W<"
   :jetty-http-port 3000
   :hostname "127.0.0.1:9000"
   :mandrill-host "smtp.mandrillapp.com"
   :mandrill-user "ops+mandrill@mojotech.com"
   :mandrill-pass "-QG6MBSWNPR7sPwRali8Jg"
   :datomic-uri "datomic:mem://bunsen-dev"
   :datomic-seed-files "./resources/user/seed.edn:./resources/notebook/seed.edn:./resources/marketplace/seed.edn:./resources/marketplace/seed/two_sigma.edn"
   :datomic-migrations "user/migrations.edn:notebook/migrations.edn:marketplace/migrations.edn:provisioner/migrations.edn"
   :elasticsearch-component :embedded
   :elasticsearch-uri "http://127.0.0.1:9200"
   :container-component :docker
   :container-group "bunsen-dev"
   :container-defaults "provisioner/container.edn"
   :store-component :filesystem
   :store-root "/tmp/bunsen/scratch"
   :store-quota 10485760})

(defonce system nil)

(defn start! []
  (alter-var-root #'system (constantly
                               (-> config
                                   bunsen/config
                                   bunsen/system
                                   component/start))))

(defn stop! []
  (alter-var-root #'system #(some-> % component/stop)))

(defn restart! []
  (stop!)
  (refresh :after 'bunsen.repl/start!))

(defn watch! []
  (hawk/watch!
    [{:paths ["src"]
      :filter hawk/file?
      :handler (fn [_ {:keys [file]}]
                 (when-let [ns-sym (-> file read-file-ns-decl second)]
                   (require ns-sym :reload)
                   (println "reloaded namespace: " ns-sym)))}]))
