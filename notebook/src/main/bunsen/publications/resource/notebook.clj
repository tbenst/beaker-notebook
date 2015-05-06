(ns bunsen.publications.resource.notebook
  (:require [liberator.core :refer [defresource]]
            [bunsen.publications.helper.resource :as resource]
            [bunsen.publications.presenter.publications :as api]))

(defresource notebook [_ {:keys [id]}] resource/defaults
  :allowed-methods [:get]
  :exists? (fn [{{db :db} :request}]
             (if-let [p (api/find-publication db (Long. id))]
               {::notebook (:publication/contents p)}))
  :handle-ok ::notebook
  :as-response (fn [notebook _]
                 (let [attachment (str "attachment; filename=" "notebook-" id ".bkr")]
                   (-> {:body notebook}
                       (assoc-in [:headers "Content-Disposition"] attachment)))))
