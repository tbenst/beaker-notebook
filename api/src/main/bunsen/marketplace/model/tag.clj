(ns bunsen.marketplace.model.tag
  (:require [bunsen.common.helper.elasticsearch :as es]))

(defn list-tags
  [es-conn]
  (es/aggregate-term "tags" es-conn))
