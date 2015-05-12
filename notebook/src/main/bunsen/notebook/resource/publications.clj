(ns bunsen.notebook.resource.publications
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.helper.resource :as resource]
            [bunsen.notebook.presenter.publications :as api]
            [bunsen.notebook.helper.query :as q]))

(defn parse-num-or-default
  "Parses a number from a string parameter or if the parameter is nil returns a default value."
  [num default-value]
  ((fnil #(Long. %) default-value) num))

(defresource publications [_] resource/defaults
  :allowed-methods [:post :get]
  :post! (fn [{{conn :conn params :params} :request}]
           (api/create-publication conn params))
  :handle-ok (fn [{{db :db params :params} :request}]
               (let [term (get params "searchTerm")
                     category-id (get params "category_id")
                     offset (parse-num-or-default (get params "offset") 0)
                     limit (parse-num-or-default (get params "limit") Long/MAX_VALUE)]
                 (-> (api/find-publications db category-id term)
                     (q/paginate offset limit)))))
