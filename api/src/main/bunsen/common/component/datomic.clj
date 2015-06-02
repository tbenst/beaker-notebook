(ns bunsen.common.component.datomic
  (:require [clojure.edn :as edn]
            [clojure.string :as str]
            [clojure.java.io :as io]
            [io.rkn.conformity :as c]
            [datomic.api :as d :refer [q]]
            [crypto.password.bcrypt :as password]
            [com.stuartsierra.component :as component]
            [bunsen.common.protocol.seedable :as seedable]))

(defn read-resource [path]
  (->> path io/resource slurp))

(defn read-edn-resource [path]
  (->> path
       read-resource
       (edn/read-string
         {:readers (merge
                     *data-readers*
                     {'file read-resource
                      'bcrypt password/encrypt})})))

(defn migrate! [conn migrations]
  (when migrations
    (doseq [migration (str/split migrations #":")]
      (c/ensure-conforms conn (read-edn-resource migration)))))

(defn seed! [conn seeds]
  (when seeds
    (doseq [seed (str/split seeds #":")]
      (d/transact conn (read-edn-resource seed)))))

(defrecord Datomic [config]
  component/Lifecycle

  (component/start [datomic]
    (if (:conn datomic)
      datomic
      (let [uri (:datomic-uri config)]
        (d/create-database uri)
        (let [conn (d/connect uri)]
          (migrate! conn (:datomic-migrations config))
          (seed! conn (:datomic-seeds config))
          (assoc datomic :conn conn)))))

  (component/stop [datomic]
    (when-let [conn (:conn datomic)]
      (d/release conn))
    (dissoc datomic :conn))

  seedable/Seedable

  (seedable/unseed! [datomic]
    (let [uri (:datomic-uri config)]
      (d/delete-database uri)
      (d/create-database uri)
      (migrate! (d/connect uri) (:datomic-migrations config)))))

(defn datomic [config]
  (map->Datomic {:config config}))
