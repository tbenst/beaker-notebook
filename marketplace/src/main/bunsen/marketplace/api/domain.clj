(ns bunsen.marketplace.api.domain
  (:require [bunsen.marketplace.base :as base]
            [bunsen.marketplace.categories :as cats]
            [bunsen.marketplace.datasets :as datasets]
            [bunsen.marketplace.mappings :as mappings]
            [bunsen.marketplace.simple.simple :as simple]
            [clojure.data.json :as json]
            [clojurewerkz.elastisch.rest :as rest]
            [clojurewerkz.elastisch.rest.index :as ind]
            ))

(defn update-marketplace
  "Performs some common pre-processing tasks before kicking off the
  specified marketplace work.
  config = application config instance
  body = string representation of request body
  biz-fn = business task that we intend to perform"
  [config body biz-fn]
  (let [es-url (:elasticsearch-url config)
        es-conn (rest/connect es-url)
        payload (json/read-str body :key-fn keyword)
        index-name (:indexName payload)]
    (biz-fn es-conn index-name payload)))

(defn get-status [ctx] "ok")

(defn create-categories
  "Returns true if categories payload was succesfully sent to
  ElasticSearch, false otherwise."
  [es-conn index-name payload]
  (let [categories (:categories payload)
        indexer (base/index! es-conn index-name "categories" categories
                             identity ; json already parsed
                             cats/add-id-for-elastisch
                             base/bulk-to-es!)]
    (await-for 5000 indexer)
    (= (:stage @indexer) :indexed)))

(defn create-datasets
  "Returns true if datasets payload was succesfully sent to
  ElasticSearch, false otherwise."
  [es-conn index-name payload]
  (let [datasets (:datasets payload)
        categories (base/read-indexed-results es-conn index-name "categories")
        indexer (base/index! es-conn index-name "datasets" datasets
                   identity ; json already parsed
                   (fn [result]
                     (map (partial simple/prepare-dataset categories)
                          result))
                   base/bulk-to-es!)]
    (await-for 5000 indexer)
    (= (:stage @indexer) :indexed)))

(defn update-counts
  [es-conn index-name payload]
  (let [categories (base/read-indexed-results es-conn index-name "categories")]
    (cats/update-counts! es-conn index-name categories)))

(defn update-mappings
  "Updates the ElasticSearch mappings necessary for the index's catalog
  metadata"
  [es-conn index-name payload]
  (let [categories (base/read-indexed-results es-conn index-name "categories")]
    (cats/update-mappings! es-conn index-name categories)))

(defn refresh-index
  [es-conn index-name payload]
  (ind/refresh es-conn index-name))

(defn create-index
  [es-conn index-name payload]
  (ind/delete es-conn index-name)
  (ind/create es-conn index-name)
  (mappings/apply-mappings! es-conn index-name "simple/mappings.json"))
