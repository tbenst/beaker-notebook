(ns bunsen.marketplace.model.vendor
  (:require [bunsen.marketplace.helper.elasticsearch :as es]))

(defn list-vendors
  [es-conn]
  (es/aggregate-term "vendor" es-conn))
