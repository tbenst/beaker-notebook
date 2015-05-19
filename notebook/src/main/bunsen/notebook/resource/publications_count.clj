(ns bunsen.notebook.resource.publications-count
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.helper.resource :as resource]
            [bunsen.notebook.presenter.publications :as api]))

(defresource publications-count [_] resource/defaults
  :allowed-methods [:get]
  :handle-ok (fn [{{db :db params :params} :request}]
               (let [term (get params "searchTerm")
                     category-id (get params "category_id")]
                 {:count (-> (api/find-publications db category-id term)
                             count)})))

