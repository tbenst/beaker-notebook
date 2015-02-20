(ns bunsen.marketplace.component.config
  (:require [clojure.java.io :as io]
            [clojure.data.json :as json]
            [clojure.string :refer [join]]))

(defn config
  "
  :server-port e.g. 8444
  :elasticsearch-url, e.g. http://10.10.10.10:9200
  "
  [env]
  {:server-port (Integer. (:marketplace-port env))
   :elasticsearch-url (join "" ["http://" (:elasticsearch-host env) ":"
                                (:elasticsearch-port env)])})
