(ns bunsen.indexer.mappings
  (:require [bunsen.indexer.base :as base]
            [clojure.data.json :as json]
            [clojurewerkz.elastisch.rest :as rest]
            [clojurewerkz.elastisch.rest.index :as ind]
            [taoensso.timbre :as log]
            ))

(defn intended-mappings
  "Returns the mappings to be used in ElasticSearch for catalogs"
  []
  (-> "mapping.json" base/json-resource :mappings))

(defn apply-mappings!
  "Given an elasticsearch connection, attempts to update the mappings to current canonical version"
  [es-conn index-name]
  (let [mappings (intended-mappings)
        mapping-applyer (agent {})]
    (add-watch mapping-applyer
               :log (fn [key ref old-ctx new-ctx]
                      (log/info "mapping-apply value change: " new-ctx)))
    (send-off mapping-applyer
              (fn [ctx]
                (assoc ctx :datasets-response
                       (ind/update-mapping es-conn index-name "datasets"
                                           :mapping (:datasets mappings)))
                ))
    (send-off mapping-applyer
              (fn [ctx]
                (assoc ctx :categtories-response
                       (ind/update-mapping es-conn index-name "categories"
                                           :mapping (:categories mappings)))
                ))
    (await-for 5000 mapping-applyer)
    ))
