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

; http://mikerowecode.com/2013/02/clojure-polling-function.html
(defn- wait-for
  "Invoke predicate every interval (default 2) seconds until it returns true,
   or timeout when (default 10) seconds have elapsed.
   Returns nil if the timeout elapses before the predicate becomes true, otherwise
   the value of the predicate on its last evaluation."
  [predicate & {:keys [interval timeout]
                :or {interval 2
                     timeout 10}}]
  (let [end-time (+ (System/currentTimeMillis) (* timeout 1000))]
    (loop []
      (if-let [result (predicate)]
        result
        (do
          (Thread/sleep (* interval 1000))
          (if (< (System/currentTimeMillis) end-time)
            (recur)))))))

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
        (wait-for
          #(-> (try
                 (marathon/inspect-app (:client this) (scope-id id config))
                 (catch Exception _ nil))
               :app
               :deployments
               empty?)
          :timeout 120)

        (marathon/create-app! (:client this) spec))
      {:id id}))

  (container/destroy!
    [this id]
    (marathon/destroy-app! (:client this) (scope-id id config))))

(def marathon ->Marathon)
