(ns bunsen.user.resource.seed-users
  (:require [liberator.core :refer [defresource]]
            [bunsen.user.model.user :as u]
            [bunsen.common.helper.resource :refer [defaults]]))

(defresource seed-users [_] defaults
  :allowed? (comp #{"true"} :allow-seed :config :request)

  :allowed-methods #{:post}

  :post! (fn [{{conn :conn params :params} :request}]
           (if-let [user (u/create-user! conn params)]
             {::user user}))

  :handle-created ::user)
