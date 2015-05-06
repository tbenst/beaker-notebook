(ns bunsen.publications.resource.publications
  (:require [liberator.core :refer [defresource]]
            [bunsen.publications.helper.resource :as resource]
            [bunsen.publications.presenter.publications :as api]
            [bunsen.publications.helper.query :as q]))

(defn parse-num-or-default
  "Parses a number from a string parameter or if the parameter is nil returns a default value."
  [num default-value]
  ((fnil #(Long. %) default-value) num))

(defresource publications [_ {:keys [id]}] resource/defaults
  :allowed-methods [:post :get]
  :post! (fn [_]
           (api/create-publication (:conn request) (:params request)))
  :handle-ok (fn [_]
               (let [params (:params request)
                     term (get params "searchTerm")
                     category-id (get params "category_id")
                     offset (parse-num-or-default (get params "offset") 0)
                     limit (parse-num-or-default (get params "limit") Long/MAX_VALUE)]
                 (-> (api/find-publications (:db request) category-id term)
                     (q/paginate offset limit)))))
