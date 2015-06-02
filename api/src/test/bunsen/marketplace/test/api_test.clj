(ns bunsen.marketplace.test.api-test
  (:require [clojure.java.io :as io]
            [clojure.data.json :as json]
            [clojure.test :refer :all]
            [bunsen.common.test-helper.request :refer :all]
            [bunsen.common.helper.elasticsearch :as es]
            [bunsen.marketplace.cli.seed :refer [seed!]]
            [bunsen.marketplace.cli.seed.simple :as simple]))

;; FIXME:
;;  sign-in is broken, the tests only work because :allow-seed is set to true

(def index-name "catalog_simple")

(defn seed-marketplace! []
  (seed! (es/connect-to-es)
          index-name
          "simple/mappings.json"
          (io/resource "simple/datasets.json")
          (io/resource "simple/categories.json")
          simple/index-datasets!
          simple/index-categories!))

(defn drop-marketplace! []
  (es/delete-index! (es/connect-to-es) index-name))

(defn setup-market-tests [f]
  (drop-marketplace!)
  (seed-marketplace!)
  (f))

(defn search-categories []
  (json/read-str (:body
                   (fetch "/marketplace/v1/categories"
                          {:cookie-store (sign-in 1)
                           :query-params {:index-name "catalog_simple"
                                          :search-term "fun"}}))
                 :key-fn keyword))

(deftest read-indices
  (testing "getting all indicies"
    (let [catalog (json/read-str
                    (:body (fetch "/marketplace/v1/indices" {:cookie-store (sign-in 1)}))
                    :key-fn keyword)]
      (is (= "catalog_simple" (-> catalog first :index))))))

(deftest read-categories
  (testing "reading categories by search term"
    (is (= 3 (count (search-categories)))))

  (testing "reading category tree"
    (is (= 200 (:status
                 (fetch "/marketplace/v1/categories"
                        {:cookie-store (sign-in 0)
                         :query-params {:limit 3
                                        :size 9999}}))))))

(deftest read-category
  (testing "reading a category contains name and id"
    (let [first-category (first (search-categories))]
      (are [data needle] (contains? data needle)
           first-category :id
           first-category :name))))

(deftest get-formats
  (testing "finding all formats"
    (is (= 12 (count (json/read-str
                       (:body
                         (fetch "/marketplace/v1/formats"
                                {:cookie-store (sign-in 1)
                                 :content-type :json}))))))))

(deftest get-tags
  (testing "finding all tags"
    (is (= 11 (count (json/read-str
                       (:body (fetch "/marketplace/v1/tags"
                                     {:cookie-store (sign-in 1)
                                      :content-type :json}))))))))

(deftest get-vendors
  (testing "finding all vendors"
    (is (= 53 (count (json/read-str
                       (:body (fetch "/marketplace/v1/vendors"
                                     {:cookie-store (sign-in 1)
                                      :content-type :json}))))))))

(def a-dataset
  {:description "Very descriptive"
   :vendor "See spot run"
   :metaDataChanged "2012-10-05T18:15:30-05:00"
   :public true
   :createdAt "1993-10-05T18:15:30-05:00"
   :title "Fuzzy Wozzy tread warehouse inventory"
   :categories [{:path "0.0.0"
                 :name "Market Data"
                 :id"32"}]
   :categoryIds [32]
   :lastUpdated "2013-07-05T18:15:30-05:00"
   :remoteFile "file://./tank_treads.csv"
   :businessOwner "882-HU-BBT"})

(deftest create-dataset
  (testing "creating a dataset"
    (is (= 201 (:status
                 (post "/marketplace/v1/indices/catalog_simple/datasets"
                       {:body (json/write-str a-dataset)
                        :cookie-store (sign-in 1)
                        :content-type :json}))))))

(deftest get-datasets
  (testing "finding datasets with params"
    (let [datasets (json/read-str
                     (:body (fetch (str "/marketplace/v1/indices/" index-name "/datasets")
                                   {:cookie-store (sign-in 1)
                                    :query-params {:from 0
                                                   :limit 10
                                                   :category-path 0.0}}))
                     :key-fn keyword)]
      (is (= 14 (:total-items datasets))))))

(use-fixtures :each setup-market-tests)
