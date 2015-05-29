(ns bunsen.marketplace.component.handler
  (:require [bunsen.marketplace.route :refer [routes]]
            [bunsen.marketplace.resource :refer [resources]]
            [bunsen.common.helper.handler :refer [make-handler]]
            [bunsen.common.middleware.with :refer [wrap-with]]
            [bunsen.common.middleware.database :refer [wrap-database]]
            [com.stuartsierra.component :as component :refer [start stop]]))

(defrecord Handler [config database elasticsearch]
  component/Lifecycle

  (start [handler]
    (if (:fn handler)
      handler
      (assoc handler :fn (-> (make-handler routes resources)
                             (wrap-with :es (:conn elasticsearch))
                             (wrap-database config database)))))

  (stop [handler]
    (dissoc handler :fn)))

(defn handler [config]
  (map->Handler {:config config}))
