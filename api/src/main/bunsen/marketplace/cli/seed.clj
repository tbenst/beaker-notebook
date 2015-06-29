(ns bunsen.marketplace.cli.seed
  (:require [clojure.java.io :as io]
            [clojure.tools.cli :refer [cli]]
            [environ.core :refer [env]]
            [bunsen.common.helper.elasticsearch :as es]
            [bunsen.marketplace.api :as api]
            [bunsen.marketplace.cli.seed.simple :as simple]
            [bunsen.marketplace.cli.seed.two-sigma :as two-sigma]))

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
    (api/update-dataset-mappings! es-conn index-name)))

(defn -main [& args]
  (let [[options arguments banner] (cli args
                                        ["-h" "--help" "Print options"
                                         :flag true
                                         :default false]
                                        ["-e" "--elasticsearch-uri" "Elasticsearch URI"
                                         :default nil]
                                        ["-i" "--index-name" "Index name"
                                         :default "misc"]
                                        ["-m" "--mappings" "Mapping type"
                                         :default "marketplace/seed/mappings.json"]
                                        ["-d" "--datasets" "Datasets file location"
                                         :default (io/resource "marketplace/seed/datasets_0.1.json")]
                                        ["-c" "--categories" "Categories file location"
                                         :default (io/resource "marketplace/seed/categories_0.1.json")]
                                        ["-s" "--seeder" "Seeder type"
                                         :default "simple"])]

    (cond
      (:help options) (println banner)

      ;; TODO: use a protocol for this
      :else (let [[index-datasets!
                   index-categories!] (condp = (:seeder options)
                                        "simple" [simple/index-datasets!
                                                  simple/index-categories!]
                                        "two-sigma" [two-sigma/index-datasets!
                                                     two-sigma/index-categories!])]
              (seed! (es/connect
                       (:elasticsearch-uri options))
                     (:index-name options)
                     (:mappings options)
                     (:datasets options)
                     (:categories options)
                     index-datasets!
                     index-categories!)

              (System/exit 0)))))
