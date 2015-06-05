(ns bunsen.provisioner.component.marathon
  (:require [marathon-client.core :as marathon]
            [com.stuartsierra.component :as component :refer [Lifecycle]]
            [bunsen.provisioner.protocol.container :as container :refer [Container]]))

(defn- scope-id
  [id config]
  (str "/" (:container-group config) "/" id))

(defn- container-env->env
  [env]
  (->> env
       (map
         (fn [[k v]] [k (or v "\"\"")]))
       (into {})))

(defn- container-ports->port-mappings
  [ports]
  (mapv
    (fn [p]
      (cond-> {:host-port (or (:host p) 0)
               :container-port (:container p)
               :protocol (or (:protocol p) "tcp")}
        (:service p) (assoc :service-port (:service p))))
    ports))

(defn- container-volumes->volumes
  [volumes]
  (mapv
    (fn [v]
      {:host-path (:host v)
       :container-path (:container v)
       :mode (or (:mode v) "RW")})
    volumes))

(defn- container->spec
  [{:keys [id mem cmd env cpus uris image ports volumes]} config]
  {:id (scope-id id config)
   :mem mem
   :cmd cmd
   :env (container-env->env env)
   :cpus cpus
   :uris uris
   :instances 1
   :container {:type "DOCKER"
               :docker {:image image
                        :network "BRIDGE"
                        :port-mappings (container-ports->port-mappings ports)}
               :volumes (container-volumes->volumes volumes)}})

(defrecord Marathon [config]
  Lifecycle

  (component/start
    [this]
    (if (:client this)
      this
      (assoc this :client (marathon/client
                            {:uri (:marathon-uri config)}))))

  (component/stop
    [this]
    (dissoc this :client))

  Container

  (container/inspect
    [this id]
    (when (try
            (marathon/inspect-app (:client this) (scope-id id config))
            (catch Exception _ nil))
      {:id id}))

  (container/create!
    [this container]
    (let [id (:id container)
          spec (container->spec container config)]
      (when-not (try
                  (marathon/inspect-app (:client this) (scope-id id config))
                  (catch Exception _ nil))
        (marathon/create-app! (:client this) spec))
      {:id id}))

  (container/destroy!
    [this id]
    (marathon/destroy-app! (:client this) (scope-id id config))))

(def marathon ->Marathon)
