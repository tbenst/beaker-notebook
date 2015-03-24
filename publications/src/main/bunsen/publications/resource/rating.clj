(ns bunsen.publications.resource.rating
  (:require [liberator.core :refer [defresource]]
            [bunsen.publications.helper.resource :as resource]
            [bunsen.publications.presenter.ratings :as api]))

(defresource rating [_ {:keys [id]}] resource/defaults
  :allowed-methods [:get]
  :exists? (fn [_]
             {::rating (api/find-rating (:db request) (Long. id) 1)})
  :handle-ok ::rating)
