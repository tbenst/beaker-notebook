(ns bunsen.provisioner.presenter.api
  (:require [bunsen.provisioner.helper.bamboo :as bamboo]
            [bunsen.provisioner.helper.marathon :as marathon]))

(defn get-status [ctx] "ok")

(defn get-instance [config id]
  (let [{:keys [app-group
                marathon-url]} config
        app-id (str app-group "/" id)]
    (when (marathon/get-app marathon-url app-id)
      {:id id})))

(defn create-instance [config id]
  (let [{:keys [bamboo-url
                marathon-url
                app-group
                app-template
                service-host
                service-path]} config
        app-id (str app-group "/" id)
        app (marathon/app
              {:id app-id
               :template app-template})
        service (bamboo/service
                  {:id app-id
                   :host service-host
                   :path (str service-path "/" id "/")})]
    (when (and (marathon/create-app marathon-url app)
               (bamboo/create-or-update-service bamboo-url app-id service))
      {:id id})))
