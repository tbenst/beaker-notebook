(ns bunsen.user.model.user
  (:require [datomic.api :as d]
            [bunsen.common.helper.utils :as utils]
            [crypto.password.bcrypt :as password]
            [bouncer.core :as b]
            [bouncer.validators :as v]
            [clojure.string :refer [lower-case]]))

(def user-pattern
  '[* {:user/roles [*]}])

(defn emails-equal? [e f]
  (= (lower-case e) (lower-case f)))

(defn find-user-by-email-role [{:keys [db email role] :as params}]
  (d/q '[:find (pull ?user pattern) .
         :in $ pattern [?email ?role]
         :where
         [?user :user/email ?e]
         [?user :user/roles ?role]
         [(bunsen.user.model.user/emails-equal? ?e ?email)]]
       db user-pattern [email role]))

(defn find-user-by-email [{:keys [db email exclude] :as params}]
  (-> (d/q '[:find [(pull ?user pattern)]
             :in $ pattern [?email ?exclude]
             :where
             [?user :user/email ?e]
             [?user :user/public-id ?id]
             [(not= ?id ?exclude)]
             [(bunsen.user.model.user/emails-equal? ?e ?email)]]
           db user-pattern [email (if exclude (utils/uuid-from-str exclude) nil)])
      first))

(defn find-user-by-id [db id]
  (-> (d/q '[:find [(pull ?user pattern)]
             :in $ pattern ?id
             :where [?user :user/public-id ?id]]
           db user-pattern (utils/uuid-from-str id))
      first))

(defn find-user-by-account [db account]
  (-> (d/q '[:find [(pull ?user pattern)]
             :in $ pattern ?account
             :where [?user :user/account ?account]]
           db user-pattern account)
      first))

(defn fix-user-format [u]
  (-> (select-keys u [:user/public-id :user/account
                      :user/name :user/email
                      :user/roles :user/job-title
                      :user/bio :user/company])
      (assoc :user/roles (map #(:db/ident %) (:user/roles u)))))

(defn load-user [db id]
  (when-let [user (when id
                    (find-user-by-id db id))]
    (fix-user-format user)))

(defn user-roles
  ([] [:role/bunsen])
  ([r] (mapv #(keyword "role" %) (or r ["bunsen"]))))

(defn ext-load-user [db account conn]
  (if-let [user (find-user-by-account db account)]
    (fix-user-format user)
    ; automatically create a user
    (let [user {:db/id (d/tempid :db.part/user)
                :user/public-id (d/squuid)
                :user/account account
                :user/name account
                :user/email account
                :user/password ""
                :user/roles (user-roles)}]
      @(d/transact conn [user])
      (dissoc user :user/password :db/id))))

(defn create-user! [conn {:keys [email name password roles]}]
  (let [user {:db/id (d/tempid :db.part/user)
              :user/public-id (d/squuid)
              :user/name name
              :user/email email
              :user/password (password/encrypt password)
              :user/roles (user-roles roles)}]
    @(d/transact conn [user])
    (dissoc user :user/password :db/id)))

(defn update-user! [conn id {:keys [password new-password] :as params}]
  (let [user (find-user-by-id (d/db conn) id)
        user-tx (-> params
                    (dissoc :password :new-password :roles :public-id)
                    utils/remove-nils
                    (utils/namespace-keys "user")
                    (assoc :db/id (:db/id user)))]
    (when (password/check password (:user/password user))
      (let [update-tx (if new-password
                        (assoc user-tx :user/password (password/encrypt new-password))
                        user-tx)]
        @(d/transact conn [update-tx])
        user-tx))))

(defn unique-email? [email exclude db]
  (not (find-user-by-email {:db db :email email :exclude exclude})))

(defn validate-user [db id params]
  (-> (b/validate (select-keys params [:name :email :password])
                  :name v/required
                  :email [v/required v/email [unique-email? id db :message "email already taken"]]
                  :password [v/required [v/min-count 6]])
      first))
