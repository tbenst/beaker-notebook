(ns bunsen.user.resource.sessions
  (:require [liberator.core :refer [defresource]]
            [bunsen.user.resource.defaults :refer [defaults]]
            [liberator.representation :refer [ring-response]]
            [bunsen.user.model.session :as s]))

(defresource sessions [_] defaults
  :allowed-methods #{:post}

  ; validate session params
  :processable? (fn [{{params :params} :request}]
                  (let [errors (s/validate-session params)]
                    [(empty? errors) {::errors errors}]))

  ; respond with validation errors
  :handle-unprocessable-entity ::errors

  :post! (fn [{{db :db params :params} :request}]
           (if-let [session (s/new-session db params)]
             {::session session}))

  ; write session cookie or respond with unauthorized code
  :handle-created (fn [{session ::session}]
                    (if session
                      (ring-response {:session session})
                      (ring-response {:status 401}))))
