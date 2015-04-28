(ns bunsen.user.resource.seed-users
  (:require [liberator.core :refer [defresource]]
            [bunsen.user.resource.defaults :refer [defaults]]
            [liberator.representation :refer [ring-response]]
            [bunsen.user.model.user :as u]))

(defresource seed-users [config] defaults
  :allowed? (= "true" (:allow-seed config))

  :allowed-methods #{:post}

  :post! (fn [{{conn :conn params :params} :request}]
           (if-let [user (u/create-user! conn params)]
             {::user user}))

  :handle-created ::user)
