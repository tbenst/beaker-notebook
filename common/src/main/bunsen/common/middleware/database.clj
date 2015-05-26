(ns bunsen.common.middleware.database
  (:require [datomic.api :as d :refer [q]]))

(def allow-seed?
  (comp #{"true"} :allow-seed))

(defn wrap-database [handler config database]
  (fn [req]
    (let [conn (if (allow-seed? config)
                 (d/connect
                   (:database-uri config))
                 (:conn database))
          db (d/db conn)]
      (handler
        (assoc req
               :datomic database
               :db db
               :conn conn)))))
