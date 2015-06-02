(ns bunsen.common.component.elasticsearch
  (:require [clojurewerkz.elastisch.rest :as es]
            [com.stuartsierra.component :as component :refer [start stop]]))

(defn options
  [{user :elasticsearch-user
    pass :elasticsearch-pass}]
  (if-not (and user pass)
    {}
    {:basic-auth [user pass]}))

(defrecord Elasticsearch [config]
  component/Lifecycle
  (start [es]
    (if (:conn es)
      es
      (assoc es
             :conn (es/connect
                     (:elasticsearch-uri config) (options config)))))
  (stop [es] (dissoc es :conn)))

(defn elasticsearch [config]
  (map->Elasticsearch {:config config}))
