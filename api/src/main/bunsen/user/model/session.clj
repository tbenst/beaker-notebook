(ns bunsen.user.model.session
  (:require [datomic.api :as d]
            [bouncer.core :as b]
            [bouncer.validators :as v]
            [crypto.password.bcrypt :as password]
            [bunsen.user.model.user :as u]))

(defn new-session [db {:keys [email password role]}]
  (when-let [user (u/find-user-by-email-role {:db db :email email :role (keyword "role" role)})]
    (when (password/check password (:user/password user))
      {:id (:user/public-id (u/fix-user-format user))
       :roles (:user/roles (u/fix-user-format user))})))

(defn ext-new-session [db account]
  (when-let [user (u/find-user-by-account db account)]
    {:id (:user/public-id (u/fix-user-format user))
     :roles (:user/roles (u/fix-user-format user))}))

(defn validate-session [params]
  (-> (b/validate (select-keys params [:email :password])
                  :email v/required
                  :password v/required)
      first))
