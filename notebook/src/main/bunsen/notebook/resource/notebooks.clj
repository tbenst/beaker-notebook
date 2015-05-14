(ns bunsen.notebook.resource.notebooks
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.helper.resource :as resource]
            [bunsen.notebook.presenter.notebooks :as api]))

(defresource notebooks [_] resource/defaults
  :allowed-methods [:get]
  :handle-ok (fn [{{db :db {id :id} :session} :request}]
               (if-let [project-id (-> request :route-params :project-id)]
                 (api/project-notebooks db id project-id)
                 (api/user-notebooks db id))))
