(ns bunsen.indexer.main
   (:require [bunsen.indexer.base :as base]
             [bunsen.indexer.categories :as cats]
             [bunsen.indexer.datasets :as datasets]
             [bunsen.indexer.mappings :as mappings]
             [clj-http.client :as http]
             [clojurewerkz.elastisch.rest.index :as ind]
             [clojurewerkz.elastisch.rest :as rest]
             ))

(defn reindex-catalog!
  "Given catalog urls, elasticsearch url, and index name, completely recreates the search index for the catalog"
  [dataset-base-url categories-url elasticsearch-url index-name]
  (let [es-conn (rest/connect elasticsearch-url)]
    (ind/delete es-conn index-name)
    (ind/create es-conn index-name)
    (await-for 5000 (mappings/apply-mappings! es-conn index-name))
    (await-for 5000 (cats/index-categories! es-conn index-name categories-url))
    (ind/refresh es-conn index-name)
    (let [categories (base/read-indexed-results es-conn index-name "categories")]
      (datasets/index-datasets! es-conn index-name dataset-base-url categories)
      (ind/refresh es-conn index-name)
      (cats/update-counts! es-conn index-name categories))))
