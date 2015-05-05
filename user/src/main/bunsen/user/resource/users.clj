(ns bunsen.user.resource.users
  (:require [liberator.core :refer [defresource]]
            [bunsen.user.resource.defaults :refer [defaults]]
            [liberator.representation :refer [ring-response]]
            [bunsen.user.model.user :as u]))

(defresource users [_] defaults
  :allowed-methods #{:post :get}

  :exists? (fn [{{db :db {id :id} :route-params} :request}]
             (when id
               (when-let [user (u/load-user db id)]
                 {::user user})))

  :handle-ok ::user

  ; validate user params
  :processable? (fn [{{db :db params :params method :request-method} :request}]
                  (if (= :post method)
                    (let [errors (u/validate-user db nil params)]
                      [(empty? errors) {::errors errors}])
                    true))

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
