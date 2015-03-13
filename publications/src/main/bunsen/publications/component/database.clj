(ns bunsen.publications.component.database
  (:require [clojure.edn :as edn]
            [clojure.java.io :as io]
            [datomic.api :as d :refer [q]]
            [com.stuartsierra.component :as component :refer [start stop]]))

(defrecord Database [config]
  component/Lifecycle

  (start [database]
         (if (:conn database)
           database
           (let [uri (:database-uri config)]
             (d/create-database uri)
             (let [conn (d/connect uri)]
               (assoc database :conn conn)))))

  (stop [database]
        (when-let [conn (:conn database)]
          (d/release conn))
        (dissoc database :conn)))

(defn database [config]
  (map->Database {:config config}))
