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

  :processable? (fn [{{params :params method :request-method} :request}]
                  (if (= :post method)
                    (let [errors (api/validate-publication params)]
                      [(empty? errors) {::errors errors}])
                    true))

  :handle-unprocessable-entity ::errors

  :post! (fn [{{conn :conn
                {author-id :id} :session
                params :params} :request}]
           (when-let [p (api/create-publication! conn author-id params)]
             {::publication p}))

  :handle-created ::publication

  :handle-ok (fn [{{db :db params :params} :request}]
               (let [term (get params "searchTerm")
                     category-id (get params "category_id")
                     offset (parse-num-or-default (get params "offset") 0)
                     limit (parse-num-or-default (get params "limit") Long/MAX_VALUE)]
                 (-> (api/find-publications db category-id term)
                     (q/paginate offset limit)))))
