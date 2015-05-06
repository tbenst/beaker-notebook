(ns bunsen.notebook.resource.category
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.helper.resource :as resource]
            [bunsen.notebook.presenter.categories :as api]))

(defresource category [_ {:keys [id]}] resource/defaults
  :allowed-methods [:get]
  :exists? (fn [_]
             (if-let [c (api/find-category (:db request) (Long. id))]
               {::category c}))
  :handle-ok ::category)
