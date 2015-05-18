(ns bunsen.marketplace.api.models.categories
  (:require [bunsen.marketplace.helper.api :as helper]
            [bunsen.marketplace.base :as base]
            [bunsen.marketplace.categories :as cats]
            [clojurewerkz.elastisch.rest.index :as ind]
            [clojurewerkz.elastisch.rest.document :as doc]))

(declare build-query)

(defn get-with-params
  "Returns categories based on supplied parameters.

  Typeahead -
  index-name = index which category belongs to
  search-term = three or more characters which will search against category name

  Category Tree -
  root = root of category's path
  limit = limit length of path"
  [config params]
  (let [query (build-query params)
        search (doc/search (helper/connect-to-es config)
                           (or (:index-name params) "*")
                           "categories"
                           :size (or (:size params) 25)
                           :query query)]
    (map #(merge (:_source %) {:index (:_index %)})
         (-> search :hits :hits))))

(defn create-bulk
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

(defn build-query [params]
  (cond
    ; Typeahead
    (and (:index-name params) (:search-term params))
    {:fuzzy_like_this_field {"name" {:like_text (:search-term params)}}}
    ; Category tree.
    (or (:root params) (:limit params))
    {:regexp {:path (format "%s(\\.[0-9]*){0,%s}" (or (:root params) 0) (or (:limit params) 0))}}
    ; Catch all
    :else
    {}))

(defn fetch
  "Fetches a single category within a given catalog and having a matching index"
  [es-conn index catalog-path]
  (-> (doc/search es-conn
                  index
                  "categories"
                  :size 1
                  :query {:term {:path catalog-path}})
      :hits :hits first :_source))

(defn background-update-counts
  "Updates datasets within an index with the correct count, this method
  is intended to be run after a CRUD operation"
  [es-conn index-name]
  (let [categories (base/read-indexed-results es-conn index-name "categories")]
    (future
      (ind/refresh es-conn index-name)
      (cats/update-counts! es-conn index-name categories))))
