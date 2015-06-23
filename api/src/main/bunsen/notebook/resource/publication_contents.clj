(ns bunsen.notebook.resource.publication-contents
  (:require [liberator.core :refer [defresource]]
            [bunsen.common.helper.resource :as resource]
            [bunsen.notebook.presenter.publications :as api]))

(defresource publication-contents [_] resource/defaults
  :allowed-methods [:get]

  :exists? (fn [{{db :db {pub-id :pub-id} :route-params} :request}]
             (if-let [p (api/find-publication db pub-id)]
               {::publication p}))

  :handle-ok ::publication

  :as-response (fn [p _]
                 (let [attachment (str "attachment; filename=" (:publication/name p) ".bkr")]
                   (-> {:body (:publication/contents p)}
                       (assoc-in [:headers "Content-Disposition"] attachment)))))
