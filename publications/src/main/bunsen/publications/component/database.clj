(ns bunsen.publications.component.database
  (:require [clojure.edn :as edn]
            [clojure.java.io :as io]
            [io.rkn.conformity :as c]
            [datomic.api :as d :refer [q]]
            [com.stuartsierra.component :as component :refer [start stop]]))

(defn read-resource-file [file]
  (->> file io/resource io/file slurp))

(defn migrations [file]
  (->> file
       read-resource-file
       (edn/read-string {:readers *data-readers*})))

(defn migrate [conn file]
  (c/ensure-conforms conn (migrations file)))

(defn seed-data [file]
  (->> file
       read-resource-file
       (edn/read-string {:readers (merge *data-readers* {'file read-resource-file})})))

(defrecord Database [config]
  component/Lifecycle

  (start [database]
         (if (:conn database)
           database
           (let [uri (:database-uri config)]
             (d/create-database uri)
             (let [conn (d/connect uri)
                   seed (:seed-file config)]
               (migrate conn "migrations.edn")
               (if seed (d/transact conn (seed-data seed)))
               (assoc database :conn conn)))))

  (stop [database]
        (when-let [conn (:conn database)]
          (d/release conn))
        (dissoc database :conn)))

(defn database [config]
  (map->Database {:config config}))
