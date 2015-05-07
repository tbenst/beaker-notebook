(ns bunsen.common.middleware.database
  (:require [datomic.api :as d :refer [q]]))

(defn wrap-database [handler database]
  #(let [conn (:conn database)
         db (d/db conn)
         request (assoc %
                   :db db
                   :conn conn)]
     (handler request)))
