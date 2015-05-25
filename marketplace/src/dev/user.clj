(ns user
  (:require [hawk.core :as hawk]
            [environ.core :refer [env]]
            [com.stuartsierra.component :as component]
            [clojure.tools.namespace.file :refer [read-file-ns-decl]]
            [bunsen.marketplace.service :as marketplace]))

(def ^:dynamic *marketplace*)

(defn start-marketplace []
  (alter-var-root #'*marketplace*
                  (constantly
                    (component/start (marketplace/service env)))))

(defn stop-marketplace []
  (alter-var-root #'*marketplace*
                  #(when % (component/stop %))))

(defn restart-marketplace []
  (stop-marketplace)
  (start-marketplace))

(defn watch-marketplace []
  (start-marketplace)
  (hawk/watch!
    [{:paths ["src"]
      :filter hawk/file?
      :handler (fn [_ {:keys [file]}]
                 (when-let [ns-sym (-> file read-file-ns-decl second)]
                   (require ns-sym :reload)
                   (println "reloaded namespace: " ns-sym)))}]))
