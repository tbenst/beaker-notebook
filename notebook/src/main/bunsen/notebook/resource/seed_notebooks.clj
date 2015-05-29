(ns bunsen.notebook.resource.seed-notebooks
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.resource.defaults :refer [defaults]]
            [bunsen.notebook.presenter.notebooks :as n]))

(defresource seed-notebooks [_] defaults
  :allowed? (comp #{"true"} :allow-seed :config :request)

  :allowed-methods #{:post}

  :post! (fn [{{conn :conn params :params} :request}]
           (if-let [notebook (n/create-notebook! conn params)]
             {::notebook notebook}))

  :handle-created ::notebook)
