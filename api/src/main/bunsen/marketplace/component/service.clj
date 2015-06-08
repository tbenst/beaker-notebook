(ns bunsen.marketplace.component.service
  (:require [bunsen.marketplace.route :refer [routes]]
            [bunsen.marketplace.resource :refer [resources]]
            [bunsen.common.helper.service :refer [make-handler]]
            [bunsen.common.middleware.with :refer [wrap-with]]
            [bunsen.common.middleware.datomic :refer [wrap-datomic]]
            [bunsen.common.middleware.elasticsearch :refer [wrap-elasticsearch]]
            [com.stuartsierra.component :as component :refer [start stop]]))

(defrecord Service [config datomic elasticsearch]
  component/Lifecycle

  (start [service]
    (if (:handler service)
      service
      (assoc service
             :handler (-> (make-handler routes resources)
                          (wrap-datomic config datomic)
                          (wrap-elasticsearch config elasticsearch)))))

  (stop [service]
    (dissoc service :handler)))

(defn service [config]
  (map->Service {:config config}))
