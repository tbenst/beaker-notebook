(ns bunsen.notebook.resource.status
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.helper.resource :as resource]))

(defresource status [_ _] resource/defaults
  :handle-ok (constantly "ok"))
