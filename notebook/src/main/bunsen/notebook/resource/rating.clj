(ns bunsen.notebook.resource.rating
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.helper.resource :as resource]
            [bunsen.notebook.presenter.ratings :as api]))

(defresource rating [_] resource/defaults
  :allowed-methods [:get]

  :exists? (fn [{{db :db
                  {user-id :id} :session
                  {pub-id :pub-id} :route-params} :request}]
             {::rating (api/find-rating db user-id pub-id)})

  :handle-ok ::rating)
