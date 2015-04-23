(ns user
  (:require [hawk.core :as hawk]
            [com.stuartsierra.component :as component]
            [clojure.tools.namespace.file :refer [read-file-ns-decl]]
            [clojure.tools.namespace.repl :refer [refresh refresh-all]]
            [bunsen.user.service :refer [service]]))

(def ^:dynamic *service*)

(def config
  {:server-port 3004
   :database-uri "datomic:mem://user"
   :seed-file "seed.edn"})

(defn start []
  (alter-var-root #'*service*
                  (constantly
                    (component/start (service config)))))

(defn stop []
  (alter-var-root #'*service*
                  #(when % (component/stop %))))

(defn restart []
  (stop)
  (refresh :after 'user/start))

(defn watch []
  (start)
  (hawk/watch!
    [{:paths ["src"]
      :filter hawk/file?
      :handler (fn [_ {:keys [file]}]
                 (let [ns-sym (-> file read-file-ns-decl second)]
                   (require ns-sym :reload)
                   (println "reloaded namespace: " ns-sym)))}]))
