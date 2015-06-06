(ns bunsen.provisioner.component.docker
  (:require [docker-client.core :as docker]
            [com.stuartsierra.component :as component :refer [Lifecycle]]
            [bunsen.provisioner.protocol.container :as container :refer [Container]]))

(defn- container-env->env
  [env]
  (mapv (fn [[k v]]
          (str k "=" (or v "''"))) env))

(defn- container-cmd->cmd
  [cmd]
  ["/bin/sh" "-c" cmd])

(defn container-volumes->volumes
  [volumes]
  (->> volumes
       (map (juxt (comp str :container) (constantly {})))
       (into {})))

(defn- container-ports->exposed-ports
  [ports]
  (->> ports
       (map
         (fn [p]
           [(str (:container p) "/" (or (:protocol p) "tcp")) {}]))
       (into {})))

(defn- container-volumes->binds
  [volumes]
  (mapv #(let [mode (if (#{"rw" "RW"} (:mode %))
                      ""
                      ":ro")]
           (str (:host %) ":" (:container %) mode)) volumes))

(defn- container-ports->port-bindings
  [ports]
  (->> ports
       (map (juxt
              #(str (:container %) "/" (or (:protocol %) "tcp"))
              #(vector {:host-port (str (or (:host %) (:container %)))})))
       (into {})))

(defn- container->spec
  [{:keys [id cmd env image ports volumes]} group]
  {:env (container-env->env env)
   :cmd (container-cmd->cmd cmd)
   :name group
   :image image
   :volumes (container-volumes->volumes volumes)
   :exposed-ports (container-ports->exposed-ports ports)
   :host-config {:binds (container-volumes->binds volumes)
                 :port-bindings (container-ports->port-bindings ports)}})

(defrecord Docker [config]
  Lifecycle

  (component/start
    [this]
    (if (:client this)
      this
      (assoc this :client (docker/client
                            {:uri (:docker-uri config)
                             :cert-path (:docker-cert-path config)}))))

  (component/stop
    [this]
    (dissoc this :client))

  Container

  (container/inspect
    [this id]
    (when (try
            (docker/inspect-container (:client this) (:container-group config))
            (catch Exception _ nil))
      {:id id}))

  (container/create!
    [this container]
    (let [id (:id container)
          group (:container-group config)
          spec (container->spec container group)]
      (when-not (try
                  (docker/inspect-container (:client this) group)
                  (catch Exception _ nil))
        (docker/create-container! (:client this) spec)
        (docker/start-container! (:client this) group))
      {:id id}))

  (container/destroy!
    [this _]
    (let [group (:container-group config)]
      (docker/stop-container! (:client this) group)
      (docker/remove-container! (:client this) group))))

(def docker ->Docker)
