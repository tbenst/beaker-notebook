(ns bunsen.user.resource.user
  (:require [liberator.core :refer [defresource]]
            [bunsen.user.resource.defaults :refer [defaults]]
            [liberator.representation :refer [ring-response as-response]]
            [bunsen.user.model.user :as u]
            [clojure.string :as str]
            [bunsen.user.helper.tsusers :as extuser]
            [bunsen.user.model.session :as s]))

(defresource user [_] defaults
  :allowed-methods #{:get :put}

  :processable? (fn [{{db :db params :params {id :id} :session method :request-method remote-user :remote-user} :request}]
                  (if (= :put method)
                    (if remote-user
                      {::errors "cannot edit external users"}
                      (let [errors (u/validate-user db id params)]
                        [(empty? errors) {::errors errors}]))
                    true))

  :handle-unprocessable-entity ::errors

  :exists? (fn [{{db :db conn :conn {id :id} :session remote-user :remote-user} :request}]
             (if remote-user
               (when-let [user (u/ext-load-user db remote-user conn)]
                 (let [extuser (extuser/get-ext-user (first (str/split remote-user #"@")))
                       mergeduser (extuser/merge-user user extuser)]
                   {::user mergeduser }))
               (when-let [user (u/load-user db id)]
                 {::user user})))

  :put! (fn [{{conn :conn params :params {id :id} :session} :request}]
          (when-let [user (u/update-user! conn id params)]
            {::updated-user user}))

  :handle-created (fn [{user ::updated-user}]
                    (if user
                      (dissoc user :db/id :user/public-id)
                      (ring-response {:status 401})))

  :handle-ok (fn [{{db :db remote-user :remote-user} :request user ::user :as ctx}]
               (if remote-user
                 (let [session (s/ext-new-session db remote-user)
                       resp (as-response user ctx)]
                   (ring-response (merge resp {:session session})))
                 user)))
