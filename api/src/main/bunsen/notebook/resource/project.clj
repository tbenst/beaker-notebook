(ns bunsen.notebook.resource.project
  (:require [liberator.core :refer [defresource]]
            [bunsen.common.helper.utils :as utils]
            [bunsen.common.helper.resource :refer [defaults]]
            [bunsen.notebook.presenter.project :as p]))

(defresource project [_] defaults
  :allowed-methods #{:get :put :delete}

  :processable? (fn [{{db :db
                       {owner-id :id} :session
                       {project-id :project-id} :route-params
                       params :params
                       method :request-method} :request}]
                  (if (= :put method)
                    (let [errors (p/validate-project db owner-id project-id params)]
                      [(empty? errors) {::errors errors}])
                    true))

  :handle-unprocessable-entity ::errors

  :exists? (fn [{{db :db
                  {owner-id :id} :session
                  {project-id :project-id} :route-params} :request}]
             (when-let [project (p/load-project db owner-id project-id)]
               {::project project}))

  :put! (fn [{{conn :conn
               {owner-id :id} :session
               {project-id :project-id} :route-params
               params :params} :request}]
          (when-let [p (p/update-project! conn owner-id project-id params)]
            {::updated-project p}))

  :delete! (fn [{{conn :conn
                  {owner-id :id} :session
                  {project-id :project-id} :route-params} :request}]
             (p/delete-project! conn owner-id project-id))

  :handle-created (fn [{p ::updated-project}]
                    (when p (dissoc p :db/id :project/public-id)))

  :handle-ok (fn [{{conn :conn
                    {owner-id :id} :session
                    {project-id :project-id} :route-params} :request
                   p ::project}]
               (p/update-project! conn owner-id project-id {:opened-at (utils/now)
                                                            :updated-at (:project/updated-at p)})
               p))
