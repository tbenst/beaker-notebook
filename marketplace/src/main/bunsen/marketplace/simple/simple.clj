(ns bunsen.marketplace.simple.simple
  (:require [bunsen.marketplace.base :as base]
            [bunsen.marketplace.categories :as cats]
            [bunsen.marketplace.mappings :as mappings]
            [bunsen.marketplace.two-sigma.categories :as ts-cats]
            [bunsen.marketplace.datasets :as datasets]
            [clojure.data.json :as json]
            [clojurewerkz.elastisch.rest.index :as ind]
            [clojurewerkz.elastisch.rest :as rest]))

(defn index-categories!
  [es-conn index-name filename]
  (base/index! es-conn index-name "categories" filename
               slurp
               cats/->json-for-elastisch
               base/bulk-to-es!))

(defn prepare-dataset
  [categories node]
  (datasets/indexable-dataset (:id node) (:title node) (:categoryIds node)
                              categories node))

(defn index-datasets!
  [es-conn index-name filename categories]
  (await-for 60000 (base/index! es-conn index-name "datasets" filename
                                slurp
                                (fn [result]
                                  (map (partial prepare-dataset categories)
                                       (json/read-str result :key-fn keyword)))
                                base/bulk-to-es!)))
