(ns bunsen.user.resource
  (:require [liberator.core :refer [defresource]]
            [bunsen.user.resource.users :refer [users]]
            [bunsen.user.resource.sessions :refer [sessions]]
            [bunsen.user.resource.defaults :refer [defaults]]))

(defresource status [_] defaults
  :handle-ok (constantly "ok"))

(def resources
  {:status status
   :users users
   :sessions sessions})
