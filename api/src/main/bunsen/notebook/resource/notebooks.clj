(ns bunsen.notebook.resource.notebooks
  (:require [liberator.core :refer [defresource]]
            [bunsen.common.helper.resource :as resource]
            [bunsen.notebook.presenter.notebooks :as api]))

(defn rename-data-to-contents [params]
  (-> params
      (assoc :contents (:data params))
      (dissoc :data)))

(defresource notebooks [_] resource/bunsen-defaults
  :allowed-methods [:get :post]

  :processable? (fn [{{db :db
                       params :params
                       {uid :id} :session
                       {pid :project-id} :route-params} :request}]
                  (if (:name params)
                    (let [fixed-params (assoc params :project-id pid :user-id uid)
                          errors (api/validate-notebook-name db fixed-params)]
                      [(empty? errors) {::errors errors}])
                    true))

  :handle-unprocessable-entity ::errors

  :post! (fn [{{conn :conn
                params :params
                {uid :id} :session
                {pid :project-id} :route-params} :request}]
           {::notebook (api/create-notebook! conn
                                             (merge (rename-data-to-contents params)
                                                    {:user-id uid :project-id pid}))})
  :handle-ok (fn [{{db :db
                    {uid :id} :session} :request}]
               (if-let [project-id (-> request :route-params :project-id)]
                 (api/project-notebooks db uid project-id)
                 (api/user-notebooks db uid)))

  :handle-created ::notebook)
