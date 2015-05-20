(ns bunsen.notebook.resource.notebook
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.helper.resource :as resource]
            [bunsen.notebook.presenter.notebooks :as api]))

(defn rename-data-to-contents [params]
  (-> params
      (assoc :contents (:data params))
      (dissoc :data)))

(defresource notebook [_] resource/defaults
  :allowed-methods [:get :put :delete]
  :delete! (fn [{{conn :conn {id :notebook-id} :route-params} :request}]
              (api/delete-notebook! conn id))
  :put! (fn [{{conn :conn {id :notebook-id} :route-params} :request}]
          (api/update-notebook! conn
                                id
                                (-> request :params rename-data-to-contents)))
  :handle-ok (fn [{{db :db {id :notebook-id} :route-params} :request}]
                (api/load-notebook db id)))
