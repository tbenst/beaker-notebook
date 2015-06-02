(ns bunsen.common.middleware.datomic
  (:require [datomic.api :as d :refer [q]]))

(defn wrap-datomic [handler config datomic]
  (fn [req]
    (let [conn (if (:allow-seed? config)
                 (d/connect
                   (:datomic-uri config))
                 (:conn datomic))
          db (d/db conn)]
      (handler
        (assoc req
               :datomic datomic
               :datomic-db db
               :datomic-conn conn
               :db db
               :conn conn)))))
