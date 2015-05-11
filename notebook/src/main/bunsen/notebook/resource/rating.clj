(ns bunsen.notebook.resource.rating
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.helper.resource :as resource]
            [bunsen.notebook.presenter.ratings :as api]))

(defresource rating [_] resource/defaults
  :allowed-methods [:get]
  :exists? (fn [{{db :db {id :id} :route-params} :request}]
             {::rating (api/find-rating db (Long. id) 1)})
  :handle-ok ::rating)
