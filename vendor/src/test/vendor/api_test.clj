(ns vendor.api-test
  (:require [clojure.test :refer :all]
            [clojure.data.json :as json]
            [bunsen.common.test-helper.request :refer :all]))

(deftest finding-a-vendor-by-id
  (testing "looking up a vendor by id"
    (let [admin-cs (sign-in 1)
          research-cs (sign-in 0)
          vendor-id (get (first (json/read-str (:body (seed {:model "Vendor"})))) "id")]
      (seed {:model "Vendor"})

    (are [code store] (= code (:status (fetch (str "/api/vendors/" vendor-id) {:cookie-store store})))
         200 admin-cs
         403 research-cs ))))

(deftest find-all-vendors
  (testing "finding all vendors"
    (seed [{:model "Vendor"}
           {:model "Vendor"}
           {:model "Vendor"}])

    (let [my-cs (sign-in 1)]
      (is (= 3 (count (json/read-str (:body (fetch "/api/vendors" {:cookie-store my-cs})))))))))

(deftest creating-a-vendor
  (testing "creating a vendor"
    (let [my-cs (sign-in 1)
          res (post "/api/vendors" {:form-params {:name "tom"} :cookie-store my-cs})]

    (testing "as an admin"
      (seed [{:model "Vendor"}
             {:model "Vendor"}
             {:model "Vendor"}])

      (let [my-cs (sign-in 1)]
        (is (= 3 (count (json/read-str (:body (fetch "/api/vendors" {:cookie-store my-cs}))))))))

    (testing "as a researcher"
      (seed [{:model "Vendor"}
             {:model "Vendor"}
             {:model "Vendor"}])

      (let [my-cs (sign-in 0)]
        (is (= 403 (:status (fetch "/api/vendors" {:cookie-store my-cs})))))))))

(deftest creating-a-vendor
  (testing "creating a vendor"
    (testing "as an admin"
      (let [my-cs (sign-in 1)
            res (post "/api/vendors" {:form-params {:name "tom"} :cookie-store my-cs})]

          (is (= 200 (:status res))) (is (= "tom" (get (json/read-str (:body res)) "name"))))))

    (testing "as a researcher"
      (let [my-cs (sign-in 0)
            res (post "/api/vendors" {:form-params {:name "tom"} :cookie-store my-cs})]

          (is (= 403 (:status res))))))

(deftest creating-a-duplicate-vendor
  (let [admin-cs (sign-in 1)
        research-cs (sign-in 0)]
    (seed {:model "Vendor"})

    (testing "creating a duplicate vendor"
      (are [code store] (= code (:status (post "/api/vendors" {:form-params {:name "tom"} :cookie-store store})))
           200 admin-cs
           409 admin-cs
           403 research-cs))))

(deftest finding-a-vendor
  (let [admin-cs (sign-in 1)
        research-cs (sign-in 0)]
    (seed {:model "Vendor"})

    (testing "finding a vendor that does not exist"
      (are [code store] (= code (:status (fetch "/api/vendors/12" {:cookie-store store})))
           404 admin-cs
           403 research-cs))))

(deftest updating-an-invalid-vendor
  (let [admin-cs (sign-in 1)
        research-cs (sign-in 0)]
    (seed {:model "Vendor"})

    (testing "updating a vendor that is not present"
      (are [code store] (= code (:status (put "/api/vendors/1222" {:cookie-store store})))
           404 admin-cs
           403 research-cs))))

(deftest updating-a-vendor
  (let [admin-cs (sign-in 1)
        research-cs (sign-in 0)]
    (seed {:model "Vendor"})

    (testing "updating an existing vendor"
      (are [code store] (= code (:status (put "/api/vendors/1" {:cookie-store store})))
           200 admin-cs
           403 research-cs))))

(deftest deleting-a-vendor
  (let [admin-cs (sign-in 1)
        research-cs (sign-in 0)]
    (seed {:model "Vendor"})

    (testing "deleting an existing vendor"
      (are [code store] (= code (:status (delete "/api/vendors/1" {:cookie-store store})))
           200 admin-cs
           403 research-cs
           404 admin-cs
           403 research-cs))))

(use-fixtures :each drop-all)
