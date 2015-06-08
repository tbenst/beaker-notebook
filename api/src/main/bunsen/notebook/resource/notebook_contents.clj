(ns bunsen.notebook.resource.notebook-contents
  (:require [liberator.core :refer [defresource]]
            [bunsen.common.helper.resource :as resource]
            [bunsen.notebook.presenter.notebooks :as api]))

(defresource notebook-contents [_] resource/defaults
  :allowed-methods [:get]
  :handle-ok (fn [{{db :db
                   {uid :id} :session
                   {nid :notebook-id} :route-params} :request}]
               (:notebook/contents (api/load-notebook db nid uid))))
