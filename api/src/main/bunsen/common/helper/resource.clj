(ns bunsen.common.helper.resource)

(def defaults
  {:allowed-methods #{:get}
   :available-media-types #{"text/plain" "application/json"}})

(defn bunsen-user? [{{{roles :roles} :session} :request}]
  (some #{"bunsen"} roles))

(def bunsen-defaults
  {:allowed? bunsen-user?
   :allowed-methods #{:get}
   :available-media-types #{"text/plain" "application/json"}})

