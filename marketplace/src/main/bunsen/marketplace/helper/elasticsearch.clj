(ns bunsen.marketplace.helper.elasticsearch
  (:require [clojure.java.io :as io]
            [clojure.data.json :as json]
            [clojurewerkz.elastisch.rest :as rest]
            [clojurewerkz.elastisch.rest.index :as ind]
            [clojurewerkz.elastisch.rest.document :as doc]
            [clojurewerkz.elastisch.rest.response :as res]
            [clojurewerkz.elastisch.query :as query]
            [clojurewerkz.elastisch.rest.bulk :as bulk]
            [clojurewerkz.elastisch.aggregation :as agg]
            [bunsen.marketplace.helper.pipeline :as pipe]))

(defn json-resource [path]
  (json/read-str (-> path io/resource slurp) :key-fn keyword))

(defn connect-to-es
  "[] - Connect to default elasticsearch url
   [config] - Connect to elasticsearch url with options"
  ([] (rest/connect))
  ([config]
   (rest/connect
     (:elasticsearch-url config)
     (:elasticsearch-options config))))

(defn read-results
  "Given params to specify an ES mapping, reads the entire contents into memory"
  [es-conn index-name mapping-name]
  (let [es-response (doc/search es-conn index-name mapping-name :size 9999)]
    (->> (res/hits-from es-response)
         (map :_source))))

(defn aggregate-term
  "Aggregates all unique terms used within datasets.
   However we do not pass an index since we want all indices' formats.
   It should also be noted that passing :size 0 to an aggregations query
   will set the buckets size to Integer.MAX_VALUE (all results)"
  [term es-conn]
  (let [response (doc/search es-conn "*" "datasets"
                             :query (query/match-all)
                             :aggregations {:title_terms (agg/terms term
                                                                    {:size 0})})
        aggregation (res/aggregation-from response :title_terms)]
    (map :key (:buckets aggregation))))

(defn bulk-to-es!
  "Indexes the parsed data feed in ElasticSearch"
  [es-conn index-name mapping-type payload]
  (bulk/bulk-with-index-and-type es-conn index-name mapping-type
                                 (bulk/bulk-index payload)))

(defn index!
  "Implements a pipeline which downloads and parses a data feed,
   and indexes the result in ElasticSearch.  Caller must provide the functions
   to download, parse, and index.  NOTE:  parse-fn must return a vector like
   [:result __payload__ ...]"
  [es-conn index-name mapping-type src-url download-fn parse-fn index-fn]
  (let [a (agent {:stage "new" :result src-url})]
    (pipe/pipeline
      a
      (str "indexer for " src-url)
      {:source-downloaded download-fn
       :payload-assembled parse-fn
       :indexed (partial index-fn es-conn index-name mapping-type)})))

(defn delete-index!
  [es-conn index-name]
  (ind/delete es-conn index-name))
