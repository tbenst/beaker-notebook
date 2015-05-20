(ns bunsen.notebook.resource.notebooks
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.helper.resource :as resource]
            [bunsen.notebook.presenter.notebooks :as api]))

(defn rename-data-to-contents [params]
  (-> params
      (assoc :contents (:data params))
      (dissoc :data)))

(defresource notebooks [_] resource/defaults
  :allowed-methods [:get :post]
  :post! (fn [{{conn :conn {id :project-id} :route-params} :request}]
             (api/create-notebook! conn
                          (merge (-> request :params rename-data-to-contents)
                                 {:user-id (-> request :session :id)
                                  :project-id id})))
  :handle-ok (fn [{{db :db {id :id} :session} :request}]
               (if-let [project-id (-> request :route-params :project-id)]
                 (api/project-notebooks db id project-id)
                 (api/user-notebooks db id))))
