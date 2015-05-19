(ns bunsen.notebook.resource.publication-contents
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.helper.resource :as resource]
            [bunsen.notebook.presenter.publications :as api]))

(defresource publication-contents [_] resource/defaults
  :allowed-methods [:get]

  :exists? (fn [{{db :db {pub-id :pub-id} :route-params} :request}]
             (if-let [p (api/find-publication db pub-id)]
               {::notebook (:publication/contents p)}))

  :handle-ok ::notebook

  :as-response (fn [notebook {{{pub-id :pub-id} :route-params} :request}]
                 (let [attachment (str "attachment; filename=" "notebook-" pub-id ".bkr")]
                   (-> {:body notebook}
                       (assoc-in [:headers "Content-Disposition"] attachment)))))
