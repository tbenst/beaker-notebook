(ns bunsen.notebook.resource.categories
  (:require [liberator.core :refer [defresource]]
            [bunsen.common.helper.resource :as resource]
            [bunsen.notebook.presenter.categories :as api]))

(defresource categories [_] resource/defaults
  :allowed-methods [:post :get]
  :post! (fn [{{conn :conn params :params session :session} :request}]
           (if-let [category (api/create-category conn params)]
             {::category category}))

  :handle-created ::category
  :handle-ok (fn [_]
               (api/find-categories (:db request))))
