(ns bunsen.marketplace.api.models.vendors
  (:require [bunsen.marketplace.helper.api :as helper]))

(defn get-vendors
  [config]
  (helper/aggregate-term "vendor" (helper/connect-to-es config)))
