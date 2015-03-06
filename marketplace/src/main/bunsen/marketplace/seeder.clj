(ns bunsen.marketplace.seeder
  (:require [bunsen.marketplace.base :as base]
            [bunsen.marketplace.main :as main]
            [bunsen.marketplace.simple.simple :as simple]
            [clojure.java.io :as io]
            [clojure.tools.cli :refer [cli]]))

(defn -main [& args]
  (let [dataset-file (io/resource "index/datasets_0.1.json")
        categories-file (io/resource "index/categories_0.1.json")
        index-name "catalog_0.1"
        mapping-file "index/mappings.json"
        elasticsearch-url "http://127.0.0.1:9200"
        [options arguments banner] (cli args
                                        ["-h" "--help" "Print options"
                                         :default false :flag true]
                                        ["-d" "--datasets" "Datasets file location"
                                         :default false]
                                        ["-c" "--categories" "Categories file location"
                                         :default false]
                                        ["-i" "--index-name" "Index name"
                                         :default false])]

    (cond
      (:help options)
      (println banner)

      :else
      (let [datasets (or (:datasets options) dataset-file)
            categories (or (:categories options) categories-file)
            index-name (or (:index-name options) index-name)]

        (await (main/reindex-catalog! mapping-file
                                      datasets
                                      categories
                                      elasticsearch-url
                                      index-name
                                      simple/index-categories!
                                      simple/index-datasets!)
               (System/exit 0))))))
