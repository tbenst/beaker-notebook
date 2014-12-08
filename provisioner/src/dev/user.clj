(ns user
  (:require [environ.core :refer [env]]
            [com.stuartsierra.component :as component]
            [clojure.tools.namespace.repl :refer [refresh refresh-all]]

            [bunsen.provisioner.service :refer [service]]))

(def ^:dynamic *service*)

(defn start []
  (alter-var-root #'*service*
                  (constantly
                    (component/start (service env)))))

(defn stop []
  (alter-var-root #'*service*
                  #(when % (component/stop %))))

(defn restart []
  (stop)
  (refresh :after 'user/start))
