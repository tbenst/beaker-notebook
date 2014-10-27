(ns bunsen.indexer.main
  (:require [bunsen.indexer.base :as base]
            [bunsen.indexer.categories :as cats]
            [bunsen.indexer.mappings :as mappings]
            [clojurewerkz.elastisch.rest.index :as ind]
            [clojurewerkz.elastisch.rest :as rest]
            ))

(defn reindex-catalog!
  "Given catalog urls, elasticsearch url, and index name, completely recreates the search index for the catalog"
  [mapping-file datasets-url categories-url elasticsearch-url index-name
   categories-fn datasets-fn]
  (let [es-conn (rest/connect elasticsearch-url)]
    (ind/delete es-conn index-name)
    (ind/create es-conn index-name)
    (await-for 5000 (mappings/apply-mappings! es-conn index-name mapping-file))
    (await-for 5000 (categories-fn es-conn index-name categories-url))
    (ind/refresh es-conn index-name)
    (let [categories (base/read-indexed-results es-conn index-name "categories")]
      (datasets-fn es-conn index-name datasets-url categories)
      (ind/refresh es-conn index-name)
      (cats/update-counts! es-conn index-name categories))
    ))
