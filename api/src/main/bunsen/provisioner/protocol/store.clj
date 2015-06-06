(ns bunsen.provisioner.protocol.store
  (:refer-clojure :exclude [get list]))

(defprotocol Store
  (get [this bucket id] "get an object from the bucket")
  (list [this bucket] "list objects in the bucket")
  (put! [this bucket id data] "put an object in the bucket")
  (delete! [this bucket id] "delete an object from the bucket")
  (quota [this bucket] "storage quota for bucket"))
