(ns bunsen.notebook.resource.seed-publications
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.resource.defaults :refer [defaults]]
            [bunsen.notebook.presenter.publications :as p]))

(defresource seed-publications [config] defaults
  :allowed? (= "true" (:allow-seed config))

  :allowed-methods #{:post}

  :post! (fn [{{conn :conn params :params} :request}]
           (if-let [publication (p/create-publication! conn (:author-id params) params)]
             {::publication publication}))

  :handle-created ::publication)
