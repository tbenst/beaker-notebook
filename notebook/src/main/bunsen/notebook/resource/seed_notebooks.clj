(ns bunsen.notebook.resource.seed-notebooks
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.resource.defaults :refer [defaults]]
            [liberator.representation :refer [ring-response]]
            [bunsen.notebook.presenter.notebooks :as n]))

(defresource seed-notebooks [config] defaults
  :allowed? (= "true" (:allow-seed config))

  :allowed-methods #{:post}

  :post! (fn [{{conn :conn params :params} :request}]
           (if-let [notebook (n/create-notebook! conn params)]
             {::notebook notebook}))

  :handle-created ::notebook)
