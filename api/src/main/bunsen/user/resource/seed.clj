(ns bunsen.user.resource.seed
  (:require [liberator.core :refer [defresource]]
            [bunsen.common.helper.resource :refer [defaults]]
            [bunsen.common.protocol.seedable :refer [unseed!]]))

(defresource seed [_] defaults
  :allowed? (comp #{"true"} :allow-seed :config :request)
  :allowed-methods #{:delete}
  :delete! (comp unseed! :datomic :request))
