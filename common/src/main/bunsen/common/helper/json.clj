(ns bunsen.common.helper.json
  (:require [clj-time.coerce :as t]
            [clojure.data.json :as json]))

(defn enable-uuid-json-serialization []
  (extend-type java.util.UUID
    json/JSONWriter
    (-write [uuid out]
            (json/-write (str uuid) out))))

(defn enable-date-serialization []
  (extend-type org.joda.time.DateTime
    json/JSONWriter
    (-write [date out]
            (json/-write (t/to-string date) out))))
