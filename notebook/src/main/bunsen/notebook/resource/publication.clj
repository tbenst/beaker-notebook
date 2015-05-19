(ns bunsen.notebook.resource.publication
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.helper.resource :as resource]
            [bunsen.notebook.presenter.publications :as api]))

(defresource publication [_] resource/defaults
  :allowed-methods [:get :put :delete]

  :processable? (fn [{{params :params
                       method :request-method} :request}]
                  (if (= :put method)
                    (let [errors (api/validate-publication params)]
                      [(empty? errors) {::errors errors}])
                    true))

  :handle-unprocessable-entity ::errors

  :exists? (fn [{{db :db {pub-id :pub-id} :route-params} :request}]
             (when-let [p (api/load-publication db pub-id)]
               {::publication p}))

  :put! (fn [{{conn :conn
               {author-id :id} :session
               {pub-id :pub-id} :route-params
               params :params} :request}]
          (when-let [p (api/update-publication! conn author-id pub-id params)]
            {::updated-publication p}))

  :delete! (fn [{{conn :conn
                  {author-id :id} :session
                  {pub-id :pub-id} :route-params} :request}]
             (api/delete-publication! conn author-id pub-id))

  :handle-created (fn [{p ::updated-publication}]
                    (when p (dissoc p :db/id :publication/public-id)))

  :handle-ok ::publication)
