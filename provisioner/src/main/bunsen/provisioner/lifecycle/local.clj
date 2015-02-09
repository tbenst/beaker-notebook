(ns bunsen.provisioner.lifecycle.local
  (:require [pandect.algo.sha1 :refer [sha1-bytes]]
            [clojure.data.codec.base64 :as base64]
            [bunsen.provisioner.lifecycle :refer [Lifecycle lifecycle] :as lifecycle]))

(defn encode-password [p]
  (String. (base64/encode (sha1-bytes p)) "UTF-8"))

(defmethod lifecycle :local [{:keys [local-password-path local-username]}]
  (reify Lifecycle

    (lifecycle/inspect [_ id]
      {:id id})

    (lifecycle/create! [_ {config "config"}]
      (spit
        local-password-path
        (str
          local-username
          ":{SHA}"
          (encode-password
            (str
              (get-in config ["env" "BEAKER_PASSWORD"]))))))))
