(ns bunsen.publications.resource.status
  (:require [liberator.core :refer [defresource]]
            [bunsen.publications.helper.resource :as resource]))

(defresource status [_ _] resource/defaults
  :handle-ok (constantly "ok"))
