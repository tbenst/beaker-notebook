(ns bunsen.marketplace.api.models.categories
  (:require [bunsen.marketplace.helper.api :as helper]
            [bunsen.marketplace.base :as base]
            [bunsen.marketplace.categories :as cats]
            [clojurewerkz.elastisch.rest.document :as doc]))

(defn get-categories
  "Returns all categories from specified index by search-term
  index-name = index which category belongs to
  search-term = three or more characters which will search against category name"
  [config params]
  (let [categories (doc/search (helper/connect-to-es config)
                               (:index-name params)
                               "categories"
                               :query {:fuzzy_like_this_field {"name" {:like_text (:search-term params)}}})]

    (map #(select-keys (:_source %) [:id :name :path]) (-> categories :hits :hits))))

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
