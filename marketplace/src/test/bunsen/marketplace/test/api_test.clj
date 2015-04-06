(ns bunsen.marketplace.test.api-test
  (:require [bunsen.marketplace.main :as main]
            [bunsen.marketplace.simple.simple :as simple]
            [clojure.java.io :as io]
            [clojure.data.json :as json]
            [clojure.test :refer :all]
            [bunsen.common.test-helper.request :refer :all]))

(def elasticsearch-url (str "http://"
                            (or (System/getenv "ELASTICSEARCH_HOST") "localhost")
                            ":"
                            (or (System/getenv "ELASTICSEARCH_PORT") "9200")))

(def index-name "catalog_simple")

(defn seed-marketplace []
  (main/reindex-catalog! "simple/mappings.json"
                         (io/resource "simple/datasets.json")
                         (io/resource "simple/categories.json")
                         elasticsearch-url
                         index-name
                         simple/index-categories!
                         simple/index-datasets!))

(defn setup-market-tests [f]
  (drop-all)
  (seed-marketplace)
  (f))

(defn search-categories []
  (json/read-str (:body (fetch "/marketplace/v1/categories" {:cookie-store (sign-in 1)
                                                             :query-params {:index-name "catalog_simple"
                                                                            :search-term "fun"}}))
                 :key-fn keyword))

(deftest read-indices
  (testing "getting all indicies"
    (is (= ["catalog_simple"] (json/read-str (:body (fetch "/marketplace/v1/indices" {:cookie-store (sign-in 1)})))))))

(deftest read-categories
  (testing "reading categories by search term"
    (is (= 2 (count (search-categories))))))

(deftest read-category
  (testing "reading a category contains name and id"
    (let [first-category (first (search-categories))]
      (are [data needle] (contains? data needle)
           first-category :id
           first-category :name))))

(deftest get-formats
  (testing "finding all formats"
    (is (= 3 (count (json/read-str (:body (fetch "/marketplace/v1/formats" {:cookie-store (sign-in 1)
                                                                            :content-type :json}))))))))

(use-fixtures :each setup-market-tests)
