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

  :delete! (fn [{{conn :conn
                  {nid :notebook-id} :route-params} :request}]
             (api/delete-notebook! conn nid))
  :put! (fn [{{conn :conn
               params :params
               {nid :notebook-id} :route-params} :request}]
          (api/update-notebook! conn
                                nid
                                (rename-data-to-contents params)))
  :handle-ok (fn [{{db :db
                    {nid :notebook-id} :route-params} :request}]
               (api/load-notebook db nid)))
