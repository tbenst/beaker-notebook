(ns bunsen.notebook.resource.notebook-contents
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.helper.resource :as resource]
            [bunsen.notebook.presenter.notebooks :as api]))

(defresource notebook-contents [_] resource/defaults
  :allowed-methods [:get]
  :handle-ok (fn [{{db :db {id :notebook-id} :route-params} :request}]
                (:contents (api/find-notebook db id))))
