(ns bunsen.notebook.resource.rating
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.helper.resource :as resource]
            [bunsen.notebook.presenter.ratings :as api]))

(defresource rating [_ {:keys [id]}] resource/defaults
  :allowed-methods [:get]
  :exists? (fn [_]
             {::rating (api/find-rating (:db request) (Long. id) 1)})
  :handle-ok ::rating)
