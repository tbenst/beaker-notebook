(ns bunsen.marketplace.component.elasticsearch
  (:require [clojurewerkz.elastisch.rest :as es]
            [com.stuartsierra.component :as component :refer [start stop]]))

(defrecord Elasticsearch [config]
  component/Lifecycle
  (start [es]
    (if (:conn es)
      es
      (assoc es
             :conn (es/connect
                     (:elasticsearch-url config)
                     (:elasticsearch-options config)))))
  (stop [es] (dissoc es :conn)))

(defn elasticsearch [config]
  (map->Elasticsearch {:config config}))
