(ns bunsen.notebook.resource.ratings
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.helper.resource :as resource]
            [bunsen.notebook.presenter.ratings :as api]))

(defresource ratings [_] resource/defaults
  :allowed-methods [:post :get]
  :post! (fn [{{conn :conn {id :id} :route-params} :request}]
           (->> {:publication-id (Long. id)
                 :user-id 1
                 :score (get-in request [:params "score"])}
                (api/rate-publication conn)))
  :handle-ok (fn [{{db :db {id :id} :route-params} :request}]
               (api/avg-rating db (Long. id))))
