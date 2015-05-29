(ns bunsen.provisioner.component.handler
  (:require [bunsen.provisioner.route :refer [routes]]
            [bunsen.provisioner.resource :refer [resources]]
            [bunsen.common.helper.handler :refer [make-handler]]
            [bunsen.common.middleware.database :refer [wrap-database]]
            [com.stuartsierra.component :as component :refer [start stop]]))

(defrecord Handler [config database]
  component/Lifecycle

  (start [handler]
    (if (:fn handler)
      handler
      (assoc handler :fn (-> (make-handler routes resources)
                             (wrap-database config database)))))

  (stop [handler]
    (dissoc handler :fn)))

(defn handler [config]
  (map->Handler {:config config}))
