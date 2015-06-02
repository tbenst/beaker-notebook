(ns bunsen.provisioner.lifecycle.docker
  (:require [bunsen.provisioner.helper.docker :as docker]
            [bunsen.provisioner.lifecycle :refer [Lifecycle lifecycle] :as lifecycle]))

(defmethod lifecycle :docker [{:keys [docker-uri
                                      docker-container-port
                                      docker-container-path
                                      docker-container-image
                                      docker-container-prefix
                                      scratch-space-root]}]
  (reify Lifecycle

    (lifecycle/inspect [_ id]
      (when (docker/get-container docker-uri docker-container-prefix)
        {:id id}))

    (lifecycle/create! [_ {:keys [id token]}]
      (let [container-id docker-container-prefix
            host-path (str scratch-space-root "/" id)
            existed? (docker/get-container
                       docker-uri
                       container-id)
            created? (when-not existed?
                       (docker/create-container
                         docker-uri
                         (docker/container
                           {:id container-id
                            :token token
                            :port docker-container-port
                            :image docker-container-image
                            :cmd ["/bin/sh",
                                  "-c",
                                  "su -m beaker -c \"export PATH=$PATH:/usr/sbin \u0026\u0026 /home/beaker/src/core/beaker.command --listen-interface=*\""]
                            :host-path host-path
                            :container-path docker-container-path})))]
        (when created?
          (docker/start-container
            docker-uri
            container-id))
        (when (or existed? created?)
          {:id id})))))
