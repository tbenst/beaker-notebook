(ns bunsen.notebook.resource.publications-count
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.helper.resource :as resource]
            [bunsen.notebook.presenter.publications :as api]))

(defresource publications-count [_] resource/defaults
  :allowed-methods [:get]
  :handle-ok (fn [{{db :db} :request}]
               (let [term (get-in request [:params "searchTerm"])
                     category-id (get-in request [:params "category_id"])]
                 {:count (-> (api/find-publications db category-id term)
                             count)})))

