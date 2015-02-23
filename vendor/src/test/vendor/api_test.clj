(ns vendor.api-test
  (:require [clojure.test :refer :all]
            [clojure.data.json :as json]
            [util.request :refer :all]))

(deftest finding-a-vendor-by-id
  (testing "looking up a vendor by id"
    (let [vendor-id
          (get
            (first
              (json/read-str
                (:body
                  (seed {:model "Vendor"}))))
            "id")]

      (let [my-cs (sign-in 1)]
        (is
          (= 200
             (:status
               (fetch (str "/api/vendors/" vendor-id) {:cookie-store my-cs}))))))))

(deftest find-all-vendors
  (testing "finding all vendors"
    (seed [{:model "Vendor"}
           {:model "Vendor"}
           {:model "Vendor"}])

    (let [my-cs (sign-in 1)]
      (is
        (= 3
           (count
             (json/read-str
               (:body
                 (fetch "/api/vendors" {:cookie-store my-cs})))))))))

(deftest creating-a-vendor
  (testing "creating a vendor"
    (let [my-cs (sign-in 1)
          res (post "/api/vendors" {:form-params {:name "tom"} :cookie-store my-cs})]

      (is
        (= 200
           (:status res)))
      (is
        (= "tom"
           (get
             (json/read-str
               (:body res))
             "name"))))))

(deftest creating-a-duplicate-vendor
  (testing "creating a duplicate vendor"
    (let [my-cs (sign-in 1)]
      (post "/api/vendors" {:form-params {:name "tom"} :cookie-store my-cs})

      (is
        (= 409
           (:status
             (post "/api/vendors" {:form-params {:name "tom"} :cookie-store my-cs})))))))

(deftest finding-a-vendor
  (testing "finding a vendor that does not exist"
    (let [my-cs (sign-in 1)]
      (is
        (= 404
          (:status
            (fetch "/api/vendors/12" {:cookie-store my-cs})))))))

(deftest updating-an-invalid-vendor
  (testing "updating a vendor that is not present"
    (let [my-cs (sign-in 1)]
      (is
        (= 404
           (:status
             (put "/api/vendors/1222" {:cookie-store my-cs})))))))

(deftest updating-a-vendor
  (let [my-cs (sign-in 1)]
    (seed {:model "Vendor"})

    (testing "updating an existing vendor"
      (is
        (= 200
           (:status
             (put "/api/vendors/1" {:cookie-store my-cs})))))))


(deftest deleting-a-vendor
  (let [my-cs (sign-in 1)]
    (seed {:model "Vendor"})

    (testing "deleting an existing vendor"
      (is
        (= 200
           (:status
             (delete "/api/vendors/1" {:cookie-store my-cs})))))
     (testing "deleting a non-existant vendor"
      (is
        (= 404
           (:status
             (delete "/api/vendors/1" {:cookie-store my-cs})))))))

(use-fixtures :each drop-all)
