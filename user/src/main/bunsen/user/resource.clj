(ns bunsen.user.resource
  (:require [liberator.core :refer [defresource]]
            [bunsen.user.resource.user :refer [user]]
            [bunsen.user.resource.users :refer [users]]
            [bunsen.user.resource.session :refer [session]]
            [bunsen.user.resource.sessions :refer [sessions]]
            [bunsen.user.resource.defaults :refer [defaults]]))

(defresource status [_] defaults
  :handle-ok (constantly "ok"))

(def resources
  {:status status
   :user user
   :users users
   :session session
   :sessions sessions})
