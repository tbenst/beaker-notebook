(ns bunsen.notebook.resource.seed-projects
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.resource.defaults :refer [defaults]]
            [bunsen.notebook.presenter.project :as p]))

(defresource seed-projects [_] defaults
  :allowed?  (comp #{"true"} :allow-seed :config :request)

  :allowed-methods #{:post}

  :post! (fn [{{conn :conn params :params} :request}]
           (if-let [project (p/create-project! conn (:owner-id params) params)]
             {::project project}))

  :handle-created ::project)
