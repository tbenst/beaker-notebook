(ns bunsen.indexer.mappings
  (:require [bunsen.indexer.base :as base]
            [bunsen.indexer.pipeline :as pipe]
            [clojurewerkz.elastisch.rest.index :as ind]
            ))

(defn intended-mappings
  "Returns the mappings to be used in ElasticSearch for catalogs"
  [filename]
  {:mappings (-> filename base/json-resource :mappings)})

(defn apply-mapping!
  [es-conn index-name mapping-name result]
  {:response (ind/update-mapping es-conn index-name (name mapping-name)
                                 :mapping (mapping-name (:mappings result)))
   :mappings (:mappings result)})

(defn apply-mappings!
  "Given an elasticsearch connection, attempts to update the mappings to current canonical version"
  [es-conn index-name mapping-file]
  (let [a (agent {:stage "new" :result mapping-file})]
    (base/watch-log a "mappings applyer")
    (pipe/pipeline a
                   {:mapping-parsed intended-mappings
                    :datasets-applied (partial apply-mapping! es-conn
                                               index-name :datasets)
                    :categories-applied (partial apply-mapping! es-conn
                                                 index-name :categories)})))
