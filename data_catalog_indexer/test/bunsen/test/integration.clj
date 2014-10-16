(ns bunsen.test.integration
  (:require [bunsen.indexer.base :as base]
            [bunsen.indexer.categories :as cats]
            [bunsen.indexer.datasets :as sets]
            [bunsen.indexer.main :as main]
            [bunsen.indexer.mappings :as maps]
            [clj-http.client :as http]
            [clojure.data.json :as json]
            [clojurewerkz.elastisch.rest :as rest]
            [clojurewerkz.elastisch.rest.index :as ind]
            [clojure.test :refer :all]
            ))

(def dataset-base-url "http://10.10.10.10:1880/api/v1/metadata?")
(def categories-url "http://10.10.10.10:1880/sample_categories.json")
(def elasticsearch-url "http://10.10.10.10:9200")
(def index-name "catalog_0.0")

(defn reindex-local-example!
  "performs a full reindex using common development configuration"
  []
  (main/reindex-catalog! dataset-base-url categories-url elasticsearch-url index-name))

(defn es-conn-fixture
  "Opens a connection to ES for the tests to use to verify output"
  [f]
  (def es-conn (rest/connect elasticsearch-url))
  (f))

(defn sets-from-page
  "For tests to compare against what was imported, retrieves page of sample datasets"
  [page-number]
  (base/parse-json-from-http
   sets/extract-datasets
   (base/get-with-auth (sets/source-page-url dataset-base-url page-number 0))))

(defn source-json-fixture
  "Performs a complete import and makes some relevant data available"
  [f]
  (def source-categories
    (base/parse-json-from-http cats/extract-from-source
                               (base/get-with-auth categories-url)))
  (def source-datasets
    (concat (sets-from-page 0) (sets-from-page 1)))
  (f))

(defn perform-import-fixture
  "Performs a complete import and makes some relevant data available"
  [f]
  (reindex-local-example!)
  (ind/refresh es-conn index-name)
  (f))

(defn indexed-data-fixture
  "retrieves information about the data that is already in the ES index"
  [f]
  (def indexed-categories (base/read-indexed-results es-conn index-name "categories"))
  (def indexed-datasets (base/read-indexed-results es-conn index-name "datasets"))
  (f))

(defn count-for
  "Returns count of source categories that match the data"
  [category]
  (let [cat-path (:path category)]
    (count (filter (fn [dataset]
                     (let [dataset-path (-> dataset last :categories first :path)]
                       (or (= dataset-path cat-path)
                           (.startsWith dataset-path (str cat-path ".")))))
                   indexed-datasets))))

(use-fixtures :once es-conn-fixture
  perform-import-fixture
  source-json-fixture
  indexed-data-fixture)

(deftest test-dataset-import
  (testing "All datasets indexed"
    (doseq [source-dataset source-datasets]
      (let [id (str (:id source-dataset))
            es-dataset (indexed-datasets id)
            cached-cat (-> es-dataset :categories first)
            original-cat (indexed-categories (str (:id cached-cat)))]
        (is (not (nil? es-dataset)) (str "dataset indexed " id))
        (is (= (:product source-dataset)
               (:title es-dataset))
            "title matches original title")
        (is (not (nil? original-cat)) "category referenced in index")
        (is (= (:path cached-cat) (:path original-cat))
            (str "category path matches category entity for "
                 (:id source-dataset) original-cat))))))

(deftest test-category-import
  (testing "Categories imported"
    (doseq [source-category source-categories]
      (let [source-id (str (:_id source-category))
            es-category (indexed-categories source-id)]
        (is (not (nil? es-category)) (str "category " source-id " indexed"))
        (is (= (:name source-category) (:name es-category))
            "name matches original title")
        (is (= (count-for source-category) (:count es-category))
            "cached subtree count matches observed count of datasets")))))
