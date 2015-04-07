(ns bunsen.user.resource
  (:require [liberator.core :refer [defresource]]
            [bunsen.user.resource.defaults :refer [defaults]]))

(defresource status [_] defaults
  :handle-ok (constantly "ok"))

(def resources
  {:status status})
