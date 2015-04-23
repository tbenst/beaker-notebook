(ns bunsen.user.model.session
  (:require [datomic.api :as d]
            [bouncer.core :as b]
            [bouncer.validators :as v]
            [crypto.password.bcrypt :as password]
            [bunsen.user.model.user :as u]))

(defn new-session [db {:keys [email password]}]
  (when-let [user (u/find-user-by-email {:db db :email email})]
    (when (password/check password (:user/password user))
      {:id (:user/public-id user)
       :role (:user/role user)})))

(defn validate-session [params]
  (-> (b/validate (select-keys params [:email :password])
                  :email v/required
                  :password v/required)
      first))
