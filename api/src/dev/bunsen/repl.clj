(ns bunsen.repl
  (:require [bunsen.main :as bunsen]
            [hawk.core :as hawk]
            [com.stuartsierra.component :as component]
            (clojure.tools.namespace [file :refer [read-file-ns-decl]]
                                     [repl :refer [refresh refresh-all]])))

(def config {})

(def system nil)

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
