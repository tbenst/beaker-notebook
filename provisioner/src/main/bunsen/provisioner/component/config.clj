(ns bunsen.provisioner.component.config)

(defn config [env]
  {:port (Integer. (:port env))})
