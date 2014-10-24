(ns bunsen.provisioner.helper.resource
  (:require [clojure.data.json :as json]))

(defn extract-body [ctx]
  (-> ctx :request :body slurp (json/read-str :key-fn keyword)))

(def defaults
  {:allowed-methods #{:get}
   :available-media-types #{"text/plain" "application/json"}
   :handle-exception (fn [ctx]
                       (-> ctx :exception throw))})
