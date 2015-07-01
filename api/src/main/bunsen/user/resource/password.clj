(ns bunsen.user.resource.password
  (:require [liberator.core :refer [defresource]]
            [liberator.representation :refer [ring-response as-response]]
            [bunsen.user.model.user :as u]
            [bunsen.common.helper.resource :refer [defaults]]))

(defresource password [_] defaults
  :allowed-methods #{:post :put}

  :post! (fn [{{conn :conn params :params} :request}]
           {::result (u/reset-password! conn params)})

  :put! (fn [{{conn :conn params :params} :request}]
          {::result (u/change-password! conn params)})

  :handle-created (fn [{[_ fail] ::result :as ctx}]
                    (when fail
                      (ring-response (merge (as-response {:error fail} ctx) {:status 422})))))
