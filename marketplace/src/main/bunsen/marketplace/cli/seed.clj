(ns bunsen.marketplace.cli.seed
  (:require [clojure.java.io :as io]
            [clojure.tools.cli :refer [cli]]
            [environ.core :refer [env]]
            [bunsen.marketplace.api :as api]
            [bunsen.marketplace.config :refer [config]]
            [bunsen.marketplace.cli.seed.simple :as simple]
            [bunsen.marketplace.cli.seed.two-sigma :as two-sigma]
            [bunsen.marketplace.helper.elasticsearch :refer [connect-to-es]]))

(defn seed!
  "Given catalog urls, elasticsearch url, and index name, completely recreates the search index for the catalog"
  [es-conn index-name mapping-file datasets-url categories-url datasets-fn categories-fn]
  (await-for 5000 (api/create-index! es-conn index-name mapping-file))
  (await-for 30000 (categories-fn es-conn index-name categories-url))
  (api/refresh-index! es-conn index-name)
  (let [categories (api/list-categories es-conn index-name)
        categories-by-id (zipmap (map :id categories) categories)]
    (await-for 60000 (datasets-fn es-conn index-name datasets-url categories-by-id))
    (api/refresh-index! es-conn index-name)
    (api/update-category-counts! es-conn index-name)
    (api/update-dataset-mappings! es-conn index-name)))

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

        (seed! es-conn
               index-name
               mapping-file
               datasets
               categories
               simple/index-datasets!
               simple/index-categories!)

        (System/exit 0)))))
