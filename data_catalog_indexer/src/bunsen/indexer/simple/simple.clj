(ns bunsen.indexer.simple.simple
  (:require [bunsen.indexer.base :as base]
            [bunsen.indexer.categories :as cats]
            [bunsen.indexer.mappings :as mappings]
            [bunsen.indexer.two-sigma.categories :as ts-cats]
            [bunsen.indexer.datasets :as datasets]
            [clojure.data.json :as json]
            [clojurewerkz.elastisch.rest.index :as ind]
            [clojurewerkz.elastisch.rest :as rest]
            ))

(defn index-categories!
  [es-conn index-name filename]
  (base/index! es-conn index-name "categories" filename
               slurp
               (fn [result]
                 (map (fn [cat] (assoc cat :_id (:id cat)))
                      (json/read-str result :key-fn keyword)))
               base/bulk-to-es!))

(defn prepare-dataset
  [categories node]
  (datasets/indexable-dataset (:id node) (:title node) (:categoryIds node)
                              categories node))

(defn index-datasets!
  [es-conn index-name filename categories]
  (await-for 60000
             (base/index! es-conn index-name "datasets" filename
                          slurp
                          (fn [result]
                            (map (partial prepare-dataset categories)
                                 (json/read-str result :key-fn keyword)))
                          base/bulk-to-es!)))
