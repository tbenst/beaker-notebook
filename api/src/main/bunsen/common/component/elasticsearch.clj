(ns bunsen.common.component.elasticsearch
  (:require [clojure.string :as str]
            [clojure.java.io :as io]
            [clojurewerkz.elastisch.rest :as es]
            [com.stuartsierra.component :as component :refer [start stop]])
  (:import (java.net URI)
           (org.apache.commons.io FileUtils)
           (org.elasticsearch.node NodeBuilder)
           (org.elasticsearch.common.settings ImmutableSettings)))

(defn- strip-user-info [uri]
  (URI. (.getScheme uri) nil (.getHost uri) (.getPort uri) nil nil nil))

(defn- extract-user-info [uri]
  (if-let [credentials (not-empty
                           (some-> uri .getUserInfo (str/split #":")))]
    {:basic-auth credentials}
    {}))

(defrecord Elasticsearch [config]
  component/Lifecycle

  (start [es]
    (if (:conn es)
      es
      (let [uri (URI. (:elasticsearch-uri config))]
        (assoc es
               :conn (es/connect
                       (strip-user-info uri) (extract-user-info uri))))))

  (stop [es]
    (dissoc es :conn)))

(def ^:private logs-dir "target/elasticsearch/logs")
(def ^:private data-dir "target/elasticsearch/data")

(defn- build-settings [config]
  (let [uri (URI. (:elasticsearch-uri config))]
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
      (let [node (-> (NodeBuilder/nodeBuilder)
                     (.local true)
                     (.settings (build-settings config))
                     (.node))
            conn (es/connect (:elasticsearch-uri config))]
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
