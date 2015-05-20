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
  :conflict? (fn [{{db :db
                    params :params
                    {uid :id} :session
                    {nid :notebook-id} :route-params} :request}]
               (let [errors (api/validate-notebook db params nid uid)]
                   [(not (empty? errors)) {::errors errors}]))

  :handle-conflict ::errors

  :delete! (fn [{{conn :conn
                  {uid :id} :session
                  {nid :notebook-id} :route-params} :request}]
              (api/delete-notebook! conn nid uid))

  :put! (fn [{{conn :conn
               params :params
               {uid :id} :session
               {nid :notebook-id} :route-params} :request}]
          {::notebook (api/update-notebook! conn
                                            nid
                                            uid
                                            (rename-data-to-contents params))})
  :handle-ok (fn [{{db :db
                    {uid :id} :session
                    {nid :notebook-id} :route-params} :request}]
               (api/load-notebook db nid uid))

  :handle-created ::notebook)
