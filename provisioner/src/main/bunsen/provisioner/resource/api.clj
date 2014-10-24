(ns bunsen.provisioner.resource.api
  (:require [liberator.core :refer [defresource]]
            [bunsen.provisioner.helper.resource :as resource]
            [bunsen.provisioner.presenter.api :as api-presenter]))

(defresource status [_ _] resource/defaults
  :handle-ok api-presenter/get-status)

(defresource default [_ _] resource/defaults
  :exists? (constantly false))
