(ns bunsen.publications.resource.ratings
  (:require [liberator.core :refer [defresource]]
            [bunsen.publications.helper.resource :as resource]
            [bunsen.publications.presenter.ratings :as api]))

(defresource ratings [_ {:keys [id]}] resource/defaults
  :allowed-methods [:post :get]
  :post! (fn [_]
           (->> {:publication-id (Long. id)
                 :user-id 1
                 :score (get-in request [:params "score"])}
                (api/rate-publication (:conn request))))
  :handle-ok (fn [_]
               (api/avg-rating (:db request) (Long. id))))
