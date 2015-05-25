(ns bunsen.marketplace.model.index
  (:require [clojurewerkz.elastisch.query :as query]
            [clojurewerkz.elastisch.rest.index :as ind]
            [clojurewerkz.elastisch.rest.document :as doc]
            [bunsen.marketplace.helper.pipeline :as pipe]
            [bunsen.marketplace.helper.elasticsearch :as es]))

(defn intended-mappings
  "Returns the mappings to be used in ElasticSearch for catalogs"
  [filename]
  {:mappings (-> filename es/json-resource :mappings)})

(defn apply-mapping!
  [es-conn index-name mapping-name result]
  {:response (ind/update-mapping es-conn index-name (name mapping-name)
                                 :mapping (mapping-name (:mappings result)))
   :mappings (:mappings result)})

(defn apply-mappings!
  "Given an elasticsearch connection, attempts to update the mappings to current canonical version"
  [es-conn index-name mapping-file]
  (let [a (agent {:stage "new" :result mapping-file})]
    (pipe/pipeline
      a
      "apply-mappings!"
      {:mapping-parsed intended-mappings
       :datasets-applied (partial apply-mapping! es-conn
                                  index-name :datasets)
       :categories-applied (partial apply-mapping! es-conn
                                    index-name :categories)})))

(defn list-indices
  [es-conn]
  (->>
    (doc/search es-conn "*" "categories" :query (query/filtered :filter {:regexp {:path {:value ".{0,3}"}}}))
    :hits
    :hits
    (map (fn [m] {:index (:_index m) :name (-> m :_source :name)}))))

(defn refresh-index!
  [es-conn index-name]
  (ind/refresh es-conn index-name))

(defn create-index!
  [es-conn index-name mapping-file]
  (ind/delete es-conn index-name)
  (ind/create es-conn index-name)
  (apply-mappings! es-conn index-name mapping-file))

(defn index-exists?
  [es-conn index-name]
  (ind/exists? es-conn index-name))
