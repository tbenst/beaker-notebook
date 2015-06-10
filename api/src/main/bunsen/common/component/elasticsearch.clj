(ns bunsen.common.component.elasticsearch
  (:require [clojure.java.io :as io]
            [com.stuartsierra.component :as component :refer [start stop]]
            [bunsen.common.helper.elasticsearch :as es])
  (:import (java.net URI)
           (org.apache.commons.io FileUtils)
           (org.elasticsearch.node NodeBuilder)
           (org.elasticsearch.common.settings ImmutableSettings)))

(defrecord Elasticsearch [config]
  component/Lifecycle

  (start [es]
    (if (:conn es)
      es
      (assoc es :conn (es/connect (:elasticsearch-uri config)))))

  (stop [es]
    (dissoc es :conn)))

(def ^:private logs-dir "target/elasticsearch/logs")
(def ^:private data-dir "target/elasticsearch/data")

(defn- build-settings [uri]
  (let [uri (URI. uri)]
    (-> (ImmutableSettings/settingsBuilder)
        (.put "path.logs" logs-dir)
        (.put "path.data" data-dir)
        (.put "http.enabled" "true")
        (.put "http.host" (.getHost uri))
        (.put "http.port" (.getPort uri))
        (.put "index.store.type" "memory")
        (.put "index.number_of_shards" 1)
        (.put "index.number_of_replicas" 1)
        (.build))))

(defrecord EmbeddedElasticsearch [config]
  component/Lifecycle

  (start [es]
    (if (:node es)
      es
      (let [uri (:elasticsearch-uri config)
            node (-> (NodeBuilder/nodeBuilder)
                     (.local true)
                     (.settings (build-settings uri))
                     (.node))
            conn (es/connect uri)]
        (.start node)
        (assoc es :node node :conn conn))))

  (stop [es]
    (when-let [node (:node es)]
      (doto node .stop .close)
      (-> data-dir io/file FileUtils/deleteDirectory))
    (dissoc es :node :conn)))

(defn elasticsearch [config]
  (->Elasticsearch config))

(defn embedded-elasticsearch [config]
  (->EmbeddedElasticsearch config))
