(ns bunsen.notebook.helper.json
  (:require [clj-time.coerce :as t]
            [clojure.data.json :as json]))

(defn enable-date-serialization []
  (extend-type org.joda.time.DateTime
    json/JSONWriter
    (-write [date out]
            (json/-write (t/to-string date) out))))
