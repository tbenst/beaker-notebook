(ns bunsen.notebook.resource.seed
  (:require [liberator.core :refer [defresource]]
            [bunsen.common.helper.resource :as resource]
            [bunsen.common.protocol.seedable :refer [unseed!]]))

(defresource seed [_] resource/defaults
  :allowed-methods [:delete]
  :delete! (comp unseed! :datomic :request))
