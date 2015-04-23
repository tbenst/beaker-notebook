(ns bunsen.common.helper.json
  (:require [clojure.data.json :as json]))

(defn enable-uuid-json-serialization []
  (extend-type java.util.UUID
    json/JSONWriter
    (-write [uuid out]
            (json/-write (str uuid) out))))
