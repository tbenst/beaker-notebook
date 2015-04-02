(ns bunsen.publications.resource.default
  (:require [liberator.core :refer [defresource]]
            [bunsen.publications.helper.resource :as resource]))

(defresource default [_ _] resource/defaults
  :exists? (constantly false))
