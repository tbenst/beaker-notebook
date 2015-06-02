(ns bunsen.user.component.service
  (:require [bunsen.user.route :refer [routes]]
            [bunsen.user.resource :refer [resources]]
            [bunsen.common.helper.service :refer [make-handler]]
            [bunsen.common.middleware.datomic :refer [wrap-datomic]]
            [com.stuartsierra.component :as component :refer [start stop]]))

(defrecord Service [config datomic]
  component/Lifecycle

  (start [service]
    (if (:handler service)
      service
      (assoc service
             :handler (-> (make-handler routes resources)
                          (wrap-datomic config datomic)))))

  (stop [service]
    (dissoc service :handler)))

(defn service [config]
  (map->Service {:config config}))
