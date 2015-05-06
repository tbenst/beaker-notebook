(ns bunsen.publications.helper.resource)

(def defaults
  {:allowed-methods #{:get}
   :available-media-types #{"text/plain" "application/json"}
   :handle-exception (fn [{ex :exception}]
                       (.printStackTrace ex)
                       {:error (.getMessage ex)})})

