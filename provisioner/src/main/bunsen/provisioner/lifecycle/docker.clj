(ns bunsen.provisioner.lifecycle.docker
  (:require [bunsen.provisioner.helper.docker :as docker]
            [bunsen.provisioner.lifecycle :refer [Lifecycle lifecycle] :as lifecycle]))

(defmethod lifecycle :docker [{:keys [docker-url container-prefix container-port container-image]}]
  (reify Lifecycle

    (lifecycle/inspect [_ id]
      (when (docker/get-container docker-url (str container-prefix "_" id))
        {:id id}))

    (lifecycle/create! [_ {id "id" container-config "config"}]
      (let [container-id (str container-prefix "_" id)
            existed? (docker/get-container
                       docker-url
                       container-id)
            created? (when-not existed?
                       (docker/create-container
                         docker-url
                         (docker/container
                           {:id container-id
                            :config container-config
                            :defaults {"port" container-port
                                       "image" container-image}})))]
        (when created?
          (docker/start-container
            docker-url
            container-id))
        (when (or existed? created?)
          {:id id})))))
