(ns bunsen.notebook.resource.seed-publications
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.presenter.publications :as p]
            [bunsen.common.helper.resource :refer [defaults]]))

(defresource seed-publications [config] defaults
  :allowed? (= "true" (:allow-seed config))

  :allowed-methods #{:post}

  :post! (fn [{{conn :conn params :params} :request}]
           (if-let [publication (p/create-publication! conn (:author-id params) params)]
             {::publication publication}))

  :handle-created ::publication)
