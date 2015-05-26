(ns bunsen.marketplace.model.format
  (:require [bunsen.marketplace.helper.elasticsearch :as es]))

(defn list-formats
  [es-conn]
  (es/aggregate-term "format" es-conn))
