(ns bunsen.common.test.cookie
  (:require [bunsen.common.middleware.session.cookie :as cookie]
            [clojure.test :refer :all]))

(deftest cookie-decoding
  (testing "decoding a valid secure cookie"
    (is (= "j:{\"id\":2,\"role\":0}"
        (cookie/unsign "s:j:{\"id\":2,\"role\":0}.1TlmSbivoucDYPk0CG1ngj2MRVeEwV8H6fou/7n1/ao" "r8T`628DaW90*?30)3qRx,2f8h?8(wG13:64K3=w00-8W7g962gM268D0lTS(Uq;^v15mY3gCj-u59k994_/@}W<"))))

  (testing "encoding session data"
    (is (= "s:j:{\"id\":2,\"role\":0}.1TlmSbivoucDYPk0CG1ngj2MRVeEwV8H6fou/7n1/ao"
        (cookie/signed-session (sorted-map :id 2, :role 0) "r8T`628DaW90*?30)3qRx,2f8h?8(wG13:64K3=w00-8W7g962gM268D0lTS(Uq;^v15mY3gCj-u59k994_/@}W<"))))

  (testing "decoding an insecure cookie"
    (is (= "ssss" (cookie/unsign "ssss", "foo"))))

  (testing "decoding an invalid secure cookie"
    (is (= false (cookie/unsign "s:UNSIGNED.SIGNED", "foo")))))
