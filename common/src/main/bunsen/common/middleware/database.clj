(ns bunsen.common.middleware.database
  (:require [datomic.api :as d :refer [q]]))

(defn wrap-database [handler database]
  #(let [uri (:uri database)
         conn (d/connect uri)
         db (d/db conn)
         request (assoc %
                   :db db
                   :conn conn
                   :db-uri uri)]
     (handler request)))
