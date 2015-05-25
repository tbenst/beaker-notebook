(ns bunsen.marketplace.test.auth-check
  (:require [bunsen.marketplace.resource :as resource]
            [clojure.test :refer :all]))

(deftest auth-check
  (testing "auth is bypassed when seed is enabled"
    (is (resource/allow-seed?
          {:request {:config {:allow-seed "true"}}})))

  (testing "auth is not bypassed when seed is disabled"
    (is (not (resource/allow-seed?
               {:request {:config {:allow-seed "false"}}}))))

  (testing "checking if a user has an admin role"
    (is (resource/admin?
          {:request {:session {:role 1}}})))

  (testing "auth fails when a user does not have the correct role"
    (is (not (resource/admin?
               {:request {:session {:role 0}}})))))
