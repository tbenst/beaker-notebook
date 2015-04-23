(ns bunsen.user.resource.session
  (:require [liberator.core :refer [defresource]]
            [bunsen.user.resource.defaults :refer [defaults]]
            [liberator.representation :refer [ring-response]]))

(defresource session [config] defaults
  :allowed-methods #{:delete}
  :handle-no-content (fn [_] (ring-response {:session nil})))
