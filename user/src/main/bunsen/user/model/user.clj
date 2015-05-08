(ns bunsen.user.model.user
  (:require [datomic.api :as d]
            [bunsen.common.helper.utils :as utils]
            [crypto.password.bcrypt :as password]
            [bouncer.core :as b]
            [bouncer.validators :as v]
            [clojure.string :refer [lower-case]]))

(defn emails-equal? [e f]
  (= (lower-case e) (lower-case f)))

(defn find-user-by-email [{:keys [db email exclude] :as params}]
  (-> (d/q '[:find [(pull ?user [*])]
             :in $ [?email ?exclude]
             :where
             [?user :user/email ?e]
             [?user :user/public-id ?id]
             [(not= ?id ?exclude)]
             [(bunsen.user.model.user/emails-equal? ?e ?email)]]
           db [email (if exclude (utils/uuid-from-str exclude) nil)])
      first))

(defn find-user-by-id [db id]
  (-> (d/q '[:find [(pull ?user [*])]
             :in $ ?id
             :where [?user :user/public-id ?id]]
           db (utils/uuid-from-str id))
      first))

(defn load-user [db id]
  (when-let [user (when id
                    (find-user-by-id db id))]
    (select-keys user [:user/public-id :user/name :user/email :user/role :user/job-title :user/bio :user/company])))

(defn create-user! [conn {:keys [email name password role]}]
  (let [user {:db/id (d/tempid :db.part/user)
              :user/public-id (d/squuid)
              :user/name name
              :user/email email
              :user/password (password/encrypt password)
              :user/role (or role 0)}]
    @(d/transact conn [user])
    (dissoc user :user/password :db/id)))

(defn update-user! [conn id {:keys [password new-password] :as params}]
  (let [user (find-user-by-id (d/db conn) id)
        user-tx (-> params
                    (dissoc :password :new-password :role :public-id)
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
