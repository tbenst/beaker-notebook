(ns bunsen.marketplace.helper.api
  (:require [clojurewerkz.elastisch.rest :as rest]
            [clojurewerkz.elastisch.rest.document :as doc]
            [clojurewerkz.elastisch.query :as query]
            [clojurewerkz.elastisch.aggregation :as agg]
            [clojurewerkz.elastisch.rest.response :refer :all]))

(defn connect-to-es
  [config]
  (rest/connect
    (:elasticsearch-url config)
    (:elasticsearch-options config)))

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
