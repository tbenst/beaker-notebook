(ns bunsen.user.resource.session
  (:require [liberator.core :refer [defresource]]
            [bunsen.common.helper.resource :refer [defaults]]
            [liberator.representation :refer [ring-response]]))

(defresource session [_] defaults
  :allowed-methods #{:delete}
  :handle-no-content (fn [_] (ring-response {:session nil})))
