(ns bunsen.user.resource.seed-users
  (:require [liberator.core :refer [defresource]]
            [bunsen.user.resource.defaults :refer [defaults]]
            [bunsen.user.model.user :as u]))

(defresource seed-users [config] defaults
  :allowed? (comp #{"true"} :allow-seed :config :request)

  :allowed-methods #{:post}

  :post! (fn [{{conn :conn params :params} :request}]
           (if-let [user (u/create-user! conn params)]
             {::user user}))

  :handle-created ::user)
