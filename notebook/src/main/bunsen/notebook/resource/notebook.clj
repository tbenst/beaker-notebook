(ns bunsen.notebook.resource.notebook
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.helper.resource :as resource]
            [bunsen.notebook.presenter.publications :as api]))

(defresource notebook [_] resource/defaults
  :allowed-methods [:get]
  :exists? (fn [{{db :db {id :id} :route-params} :request}]
             (if-let [p (api/find-publication db (Long. id))]
               {::notebook (:publication/contents p)}))
  :handle-ok ::notebook
  :as-response (fn [notebook {{{id :id} :route-params} :request}]
                 (let [attachment (str "attachment; filename=" "notebook-" id ".bkr")]
                   (-> {:body notebook}
                       (assoc-in [:headers "Content-Disposition"] attachment)))))
