(ns bunsen.indexer.test.simple
  (:require [bunsen.indexer.base :as base]
            [bunsen.indexer.main :as main]
            [bunsen.indexer.simple.simple :as simple]
            [clojure.java.io :as io]
            [clojurewerkz.elastisch.rest :as rest]
            [clojurewerkz.elastisch.rest.index :as ind]
            [clojure.test :refer :all]
            ))

(def dataset-file (io/resource "simple/datasets.json"))
(def categories-file (io/resource "simple/categories.json"))
(def index-name "catalog_simple")
(def mapping-file "simple/mappings.json")
(def elasticsearch-url "http://10.10.10.10:9200")
(def docker-es-url (str "http://"
                        (System/getenv "ELASTICSEARCH_PORT_9200_TCP_ADDR")
                        ":"
                        (System/getenv "ELASTICSEARCH_PORT_9200_TCP_PORT")))

(defn reindex-simple-example!
  []
  (main/reindex-catalog! mapping-file
                         dataset-file
                         categories-file
                         elasticsearch-url
                         index-name
                         simple/index-categories!
                         simple/index-datasets!))

(defn reindex-with-docker! []
  (main/reindex-catalog! mapping-file
                         dataset-file
                         categories-file
                         docker-es-url
                         index-name
                         simple/index-categories!
                         simple/index-datasets!))
