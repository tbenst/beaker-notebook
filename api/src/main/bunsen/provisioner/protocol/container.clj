(ns bunsen.provisioner.protocol.container
  (:require [clojure.edn :as edn]
            [clojure.java.io :as io]))

(defprotocol Container
  (inspect [this id] "return information about an instance")
  (create! [this spec] "create an instance")
  (destroy! [this id] "destroy an instance"))

(defn default
  [container]
  (-> container :config :container-defaults io/resource slurp edn/read-string))
