(ns bunsen.marketplace.helper.resource
  (:require [clojure.data.json :as json]))

(def defaults
  {:allowed-methods #{:get}
   :available-media-types #{"text/plain" "application/json"}
   :handle-exception #(-> % :exception throw)})
