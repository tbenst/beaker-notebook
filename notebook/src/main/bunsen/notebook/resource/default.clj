(ns bunsen.notebook.resource.default
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.helper.resource :as resource]))

(defresource default [_ _] resource/defaults
  :exists? (constantly false))
