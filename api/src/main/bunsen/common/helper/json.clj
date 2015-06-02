(ns bunsen.common.helper.json
  (:require [clj-time.coerce :as t]
            [clojure.data.json :as json]))

(defn write* [f]
  (fn [x out]
    (json/-write (f x) out)))

(extend java.util.UUID         json/JSONWriter {:-write (write* str)})
(extend java.util.Date         json/JSONWriter {:-write (write* t/to-string)})
(extend org.joda.time.DateTime json/JSONWriter {:-write (write* t/to-string)})
