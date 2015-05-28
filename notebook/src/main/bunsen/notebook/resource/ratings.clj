(ns bunsen.notebook.resource.ratings
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.helper.resource :as resource]
            [bunsen.notebook.presenter.ratings :as api]))

(defresource ratings [_] resource/defaults
  :allowed-methods [:post :get]

  :processable? (fn [{{params :params method :request-method} :request}]
                  (if (= :post method)
                    (let [errors (api/validate-rating params)]
                      [(empty? errors) {::errors errors}])
                    true))

  :handle-unprocessable-entity ::errors

  :post! (fn [{{conn :conn
                {user-id :id} :session
                {score :score} :params
                {pub-id :pub-id} :route-params} :request}]
           (->> {:publication-id pub-id
                 :user-id user-id
                 :score score}
                (api/rate-publication conn)))

  :handle-ok (fn [{{db :db {pub-id :pub-id} :route-params} :request}]
               (api/avg-rating db pub-id)))
