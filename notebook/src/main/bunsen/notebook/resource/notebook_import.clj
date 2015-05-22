(ns bunsen.notebook.resource.notebook-import
  (:require [liberator.core :refer [defresource]]
            [clojure.string :as str]
            [liberator.representation :refer [ring-response as-response]]
            [bunsen.notebook.helper.resource :as resource]
            [bunsen.notebook.presenter.notebooks :as api]))

(defresource notebook-import [_] resource/defaults
  :allowed-methods [:post]

  :processable? (fn [{{db :db
                      params :params
                      {uid :id} :session
                      {pid :project-id} :route-params} :request}]
                  (let [name (str/join "." (drop-last (str/split (get-in params ["file" :filename]) #"\.")))
                        contents (slurp (get-in params ["file" :tempfile]))
                        params (assoc params :contents contents :name name :pid pid :uid uid)
                        errors (api/validate-imported-notebook db params)]
                    [(empty? errors) {::errors errors}]))

  :handle-unprocessable-entity ::errors

  :post! (fn [{{conn :conn
               params :params
               {uid :id} :session
               {pid :project-id} :route-params} :request}]
           (let [name (str/join "." (drop-last (str/split (get-in params ["file" :filename]) #"\.")))
                 contents (slurp (get-in params ["file" :tempfile]))
                 params (assoc params :contents contents :name name :user-id uid)]
             {::notebook (api/create-notebook! conn params)}))

  :handle-created ::notebook)
