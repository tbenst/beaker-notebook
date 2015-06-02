(ns bunsen.provisioner.lifecycle.marathon
  (:require [bunsen.provisioner.helper.marathon :as marathon]
            [bunsen.provisioner.lifecycle :refer [Lifecycle lifecycle] :as lifecycle]))

(defmethod lifecycle :marathon [{:keys [marathon-uri
                                        marathon-app-group
                                        marathon-app-defaults
                                        scratch-space-root
                                        bamboo-host]}]
  (reify Lifecycle

    (lifecycle/inspect [_ id]
      (when (marathon/get-app marathon-uri (str marathon-app-group "/" id))
        {:id id}))

    (lifecycle/create! [_ {:keys [id token user]}]
      (let [app-id (str marathon-app-group "/" id)
            host-path (str scratch-space-root "/" id)
            bamboo-path (str "/beaker/" id  "/")]
        (when (or
                (marathon/get-app marathon-uri app-id)
                (marathon/create-app
                  marathon-uri
                  (marathon/app
                    {:id app-id
                     :env {"BEAKER_COOKIE" token
                           "BAMBOO_HOST" bamboo-host
                           "BAMBOO_PATH" bamboo-path
                           "AUTHORIZED_USER" user}
                     :host-path host-path
                     :defaults marathon-app-defaults})))
          {:id id})))))
