(ns bunsen.marketplace.test.auth-check
  (:require [bunsen.marketplace.api.resource :as resource]
            [clojure.test :refer :all]))

(deftest auth-check
  (testing "auth is bypassed when seed is enabled" (is (= (resource/is-admin?
                                                            {:allow-seed "true"}
                                                            {:request {:session {:role 0}}})
                                                          true)))

  (testing "auth fails when a user does not have the correct role" (is (= (resource/is-admin?
                                                                            {:allow-seed "false"}
                                                                            {:request {:session {:role 0}}})
                                                                          false)))

  (testing "checking if a user has an admin role" (is (= (resource/is-admin?
                                                           {:allow-seed "false"}
                                                           {:request {:session {:role 1}}})
                                                         true))))
