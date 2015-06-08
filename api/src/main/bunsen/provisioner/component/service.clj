(ns bunsen.provisioner.component.service
  (:require [bunsen.provisioner.route :refer [routes]]
            [bunsen.provisioner.resource :refer [resources]]
            [bunsen.common.helper.service :refer [make-handler]]
            [bunsen.common.middleware.with :refer [wrap-with]]
            [bunsen.common.middleware.datomic :refer [wrap-datomic]]
            [com.stuartsierra.component :as component :refer [start stop]]))

(defrecord Service [config datomic container store]
  component/Lifecycle

  (start [service]
    (if (:handler service)
      service
      (assoc service
             :handler (-> (make-handler routes resources)
                          (wrap-with :container container :store store)
                          (wrap-datomic config datomic)))))

  (stop [service]
    (dissoc service :handler)))

(defn service [config]
  (map->Service {:config config}))
