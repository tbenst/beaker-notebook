(ns bunsen.publications.resource.categories
  (:require [liberator.core :refer [defresource]]
            [bunsen.publications.helper.resource :as resource]
            [bunsen.publications.presenter.categories :as api]))

(defresource categories [_ _] resource/defaults
  :allowed-methods [:post :get]
  :post! (fn [_]
           (api/create-category (:conn request) (:params request)))
  :handle-ok (fn [_]
               (api/find-categories (:db request))))
