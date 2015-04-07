(ns bunsen.marketplace.helper.api
  (:require [clojurewerkz.elastisch.rest :as rest]))

(defn connect-to-es
  [config]
  (rest/connect
    (:elasticsearch-url config)
    (:elasticsearch-options config)))
