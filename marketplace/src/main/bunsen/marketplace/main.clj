(ns bunsen.marketplace.main
  (:require [bunsen.marketplace.base :as base]
            [bunsen.marketplace.categories :as cats]
            [bunsen.marketplace.api.models.datasets :as datasets]
            [bunsen.marketplace.mappings :as mappings]
            [clojurewerkz.elastisch.rest.index :as ind]
            [clojurewerkz.elastisch.rest :as rest]))

(defn reindex-catalog!
  "Given catalog urls, elasticsearch url, and index name, completely recreates the search index for the catalog"
  [mapping-file datasets-url categories-url es-conn index-name
   categories-fn datasets-fn]
  (ind/delete es-conn index-name)
  (ind/create es-conn index-name)
  (await-for 5000 (mappings/apply-mappings! es-conn index-name mapping-file))
  (await-for 30000 (categories-fn es-conn index-name categories-url))
  (ind/refresh es-conn index-name)
  (let [categories (base/read-indexed-results es-conn index-name "categories")]
    (datasets-fn es-conn index-name datasets-url categories)
    (ind/refresh es-conn index-name)
    (cats/update-counts! es-conn index-name categories (datasets/fetch-counts es-conn index-name categories))
    (cats/update-mappings! es-conn index-name categories)))
