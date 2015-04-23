(ns bunsen.user.resource.users
  (:require [liberator.core :refer [defresource]]
            [bunsen.user.resource.defaults :refer [defaults]]
            [liberator.representation :refer [ring-response]]
            [bunsen.user.model.user :as u]))

(defresource users [_] defaults
  :allowed-methods #{:post}

  ; validate user params
  :processable? (fn [{{db :db params :params} :request}]
                  (let [errors (u/validate-user db nil params)]
                    [(empty? errors) {::errors errors}]))

  ; respond with validation errors
  :handle-unprocessable-entity ::errors

  :post! (fn [{{conn :conn params :params} :request}]
           (if-let [user (u/create-user! conn (dissoc params :role))]
             {::user user}))

  ; write session cookie
  :handle-created (fn [{{params :params} :request user ::user}]
                    (let [session {:id (:user/public-id user)
                                   :role (:user/role user)}]
                      (ring-response {:session session}))))
