(ns bunsen.notebook.resource.category
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.helper.resource :as resource]
            [bunsen.notebook.presenter.categories :as api]))

(defresource category [_] resource/defaults
  :allowed-methods [:get]
  :exists? (fn [{{db :db {id :id} :route-params} :request}]
             (if-let [c (api/find-category db (Long. id))]
               {::category c}))
  :handle-ok ::category)
