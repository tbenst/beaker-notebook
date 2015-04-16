(ns bunsen.marketplace.seeder
  (:require [bunsen.marketplace.base :as base]
            [bunsen.marketplace.main :as main]
            [bunsen.marketplace.simple.simple :as simple]
            [clojure.java.io :as io]
            [clojure.tools.cli :refer [cli]]
            [bunsen.marketplace.helper.api :refer [connect-to-es]]
            [bunsen.marketplace.component.config :refer [config]]
            [environ.core :refer [env]]))

(defn -main [& args]
  (let [dataset-file (io/resource "seed/datasets_0.1.json")
        categories-file (io/resource "seed/categories_0.1.json")
        index-name "catalog_0.1"
        mapping-file "seed/mappings.json"
        [options arguments banner] (cli args
                                        ["-h" "--help" "Print options"
                                         :default false :flag true]
                                        ["-d" "--datasets" "Datasets file location"
                                         :default false]
                                        ["-c" "--categories" "Categories file location"
                                         :default false]
                                        ["-i" "--index-name" "Index name"
                                         :default false]
                                        ["-o" "--override" "Override default connection and use environment set connection. "
                                         :default false :flag true])]

    (cond
      (:help options)
      (println banner)

      :else
      (let [datasets (or (:datasets options) dataset-file)
            categories (or (:categories options) categories-file)
            index-name (or (:index-name options) index-name)
            es-conn (if (true? (:override options))
                      (connect-to-es (config env))
                      (connect-to-es))]

        (main/reindex-catalog! mapping-file
                               datasets
                               categories
                               es-conn
                               index-name
                               simple/index-categories!
                               simple/index-datasets!)
        (System/exit 0)))))
