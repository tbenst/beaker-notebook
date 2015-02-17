(ns user.api-test
  (:require [clojure.test :refer :all]
            [util.request :refer :all]))

; when a user signs up without any form info
; we need to reject the request and not create a new user
(deftest sign-up-without-body
  (testing "sign up with an empty body"
    (is
      (=
       500
       (:status
         (post "/api/sign_up"))))))

; if a user signs up without a name we need to invalidate the
; account creation process
(deftest sign-up-without-name
  (testing "sign up without a name"
    (is
      (=
       500
       (:status
         (post "/api/sign_up" {
                              :form-params { :email "tom@jones.com" :password "hellotom"}}))))))

; if a user signs up with an email that has already been taken
; we need to reject the request with the correct status code
(deftest sign-up-with-existing-user
  (testing "sign up with existing user"
    ; we want to initially seed a user into database via the signup
    ; to test the fact that another user can not sign up
    (post "/api/sign_up" {
                          :form-params {:email "tom@tom.com" :password "hellotom" :name "tom"}})
    (is
      (=
       500
       (:status
         (post "/api/sign_up" {
                               :form-params { :email "tom@tom.com" :password "hellotom" :name "tom"}}))))))

(use-fixtures :each drop-all)
