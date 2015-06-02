(ns bunsen.notebook.resource.contributors
  (:require [liberator.core :refer [defresource]]
            [bunsen.common.helper.resource :as resource]
            [bunsen.notebook.presenter.categories :as api]))

(defresource contributors [_] resource/defaults
  :allowed-methods #{:get}

  :handle-ok (fn [{{db :db {cid :cat-id} :route-params} :request}]
               (if cid
                 (api/contributors-by-cat db cid)
                 (api/contributors db))))
