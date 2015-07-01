(ns bunsen.user.resource
  (:require [liberator.core :refer [defresource]]
            [bunsen.user.resource.user :refer [user]]
            [bunsen.user.resource.users :refer [users]]
            [bunsen.user.resource.seed :refer [seed]]
            [bunsen.user.resource.seed-users :refer [seed-users]]
            [bunsen.user.resource.session :refer [session]]
            [bunsen.user.resource.sessions :refer [sessions]]
            [bunsen.user.resource.password :refer [password]]
            [bunsen.common.helper.resource :refer [defaults]]))

(defresource status [_] defaults
  :handle-ok (constantly "ok"))

(def resources
  {:status status
   :seed seed
   :seed-users seed-users
   :user user
   :users users
   :password password
   :session session
   :sessions sessions})
