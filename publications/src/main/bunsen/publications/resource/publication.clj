(ns bunsen.publications.resource.publication
  (:require [liberator.core :refer [defresource]]
            [bunsen.publications.helper.resource :as resource]
            [bunsen.publications.presenter.publications :as api]))

(defresource publication [_ {:keys [id]}] resource/defaults
  :allowed-methods [:get :put :delete]
  :exists? (fn [_]
             (if-let [p (api/find-publication (:db request) (Long. id))]
               {::publication p}))
  :put! (fn [_]
          (let [body (dissoc (:params request) :id)]
            (api/update-publication (:conn request) (Long. id) body)))
  :delete! (fn [_]
             (api/delete-publication (:conn request) (Long. id)))
  :handle-ok ::publication)
