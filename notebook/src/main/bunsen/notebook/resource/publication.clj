(ns bunsen.notebook.resource.publication
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.helper.resource :as resource]
            [bunsen.notebook.presenter.publications :as api]))

(defresource publication [_] resource/defaults
  :allowed-methods [:get :put :delete]
  :exists? (fn [{{db :db {id :id} :route-params} :request}]
             (if-let [p (api/find-publication db (Long. id))]
               {::publication p}))
  :put! (fn [{{conn :conn {id :id} :route-params} :request}]
          (let [body (dissoc (:params request) :id)]
            (api/update-publication conn (Long. id) body)))
  :delete! (fn [{{conn :conn {id :id} :route-params} :request}]
             (api/delete-publication (:conn request) (Long. id)))
  :handle-ok ::publication)
