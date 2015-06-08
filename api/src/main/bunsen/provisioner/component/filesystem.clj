(ns bunsen.provisioner.component.filesystem
  (:require [clojure.java.io :as io]
            [com.stuartsierra.component :as component :refer [Lifecycle]]
            [bunsen.provisioner.protocol.store :as store :refer [Store]]))

(defn- bucket-path [bucket config]
  (str (:store-root config) "/" bucket))

(defrecord Filesystem [config]
  Store

  (store/get
    [_ _ _]
    (throw (UnsupportedOperationException.
             "store/get not implemented for filesystem store")))

  (store/put!
    [_ bucket id data]
    (let [f (-> bucket
                (bucket-path config)
                (str "/" id)
                io/file)]
      (io/make-parents f)
      (io/copy data f)
      true))

  (store/list
    [_ bucket]
    (->> (bucket-path bucket config)
         io/file
         file-seq
         rest
         (mapv
           (fn [f]
             {:name (.getName f)
              :stat {:size (.length f)}}))))

  (store/delete!
    [_ bucket id]
    (-> bucket
        (bucket-path config)
        (str "/" id)
        io/file
        (io/delete-file true)))

  (store/quota
    [_ _]
    (:store-quota config)))

(def filesystem ->Filesystem)
