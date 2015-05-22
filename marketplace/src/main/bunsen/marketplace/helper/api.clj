(ns bunsen.marketplace.helper.api
  (:require [clojurewerkz.elastisch.rest :as rest]
            [clojurewerkz.elastisch.rest.document :as doc]
            [clojurewerkz.elastisch.query :as query]
            [clojurewerkz.elastisch.aggregation :as agg]
            [clojurewerkz.elastisch.rest.response :refer :all]
            [bunsen.common.component.database :as db]
            [datomic.api :as d]))

(defn connect-to-es
  "[] - Connect to default elasticsearch url
   [config] - Connect to elasticsearch url with options"
  ([] (rest/connect))
  ([config]
   (rest/connect
     (:elasticsearch-url config)
     (:elasticsearch-options config))))

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
        aggregation (aggregation-from response :title_terms)]
    (map :key (:buckets aggregation))))

(defn reset-db! [config]
  (let [uri (:database-uri config)]
    (d/delete-database uri)
    (d/create-database uri)
    (db/migrate (d/connect uri) "migrations.edn")))
