(ns bunsen.provisioner.lifecycle.marathon
  (:require [bunsen.provisioner.helper.marathon :as marathon]
            [bunsen.provisioner.lifecycle :refer [Lifecycle lifecycle] :as lifecycle]))

(defmethod lifecycle :marathon [{:keys [marathon-url app-group app-defaults]}]
  (reify Lifecycle

    (lifecycle/inspect [_ id]
      (when (marathon/get-app marathon-url (str app-group "/" id))
        {:id id}))

    (lifecycle/create! [_ {id "id" app-config "config"}]
      (let [app-id (str app-group "/" id)]
        (when (or
                (marathon/get-app marathon-url app-id)
                (marathon/create-app
                  marathon-url
                  (marathon/app
                    {:id app-id
                     :config app-config
                     :defaults app-defaults})))
          {:id id})))))
