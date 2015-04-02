(ns bunsen.publications.resource.category
  (:require [liberator.core :refer [defresource]]
            [bunsen.publications.helper.resource :as resource]
            [bunsen.publications.presenter.categories :as api]))

(defresource category [_ {:keys [id]}] resource/defaults
  :allowed-methods [:get]
  :exists? (fn [_]
             (if-let [c (api/find-category (:db request) (Long. id))]
               {::category c}))
  :handle-ok ::category)
