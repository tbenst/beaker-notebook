(ns bunsen.provisioner.lifecycle)

(defmulti lifecycle :lifecycle-strategy)

(defprotocol Lifecycle
  (inspect [this id] "return information about an instance")
  (create! [this spec] "create an instance")
  (destroy! [this id] "destroy an instance"))
