(ns bunsen.notebook.resource.defaults
  (:require [liberator.core :refer [defresource]]))

(def defaults
  {:allowed-methods #{:get}
   :available-media-types #{"text/plain" "application/json"}})
