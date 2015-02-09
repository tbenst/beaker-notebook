(ns bunsen.provisioner.helper.docker
  (:require [bunsen.provisioner.helper.rest :as rest]))

(defn get-container [url id]
  (try
    (rest/get url (str "containers/" id "/json"))
    ;; TODO catch only certain exceptions
    (catch Exception e nil)))

(defn create-container [url spec]
  (rest/post url
             "containers/create"
             {:form-params spec
              :query-params {"name" (get spec "Id")}}))

(defn start-container [url id]
  (rest/post url
             (str "containers/" id "/start")))

(defn stop-container [url id]
  (rest/post url (str "containers/" id "/stop")))

(defn remove-container [url id]
  (rest/delete url (str "containers/" id)))

(defn container [{:keys [id config defaults]}]
  ;; TODO this seems complicated... simplify the data
  (let [volumes (get-in config ["container" "volumes"])]
    {"Id" id
     "Env" (->> (get config "env")
                (mapv (fn [[k v]] (str k "=" v))))
     "Cmd" (get defaults "cmd")
     "Image" (get defaults "image")
     "Volumes" (mapv (fn [v]
                       {(get v "containerPath") {}})
                     volumes)
     "ExposedPorts" {(str (get defaults "port") "/tcp") {}}
     "HostConfig" {"Binds" (mapv
                             #(str
                                (get % "hostPath")
                                ":"
                                (get % "containerPath"))
                             volumes)
                   "PortBindings" {(str (get defaults "port") "/tcp")
                                   [{"HostPort" (str (get defaults "port"))}]}}}))

(comment

  (create-container
    "http://10.10.10.10:4243"
    (container {:id "hello"
                :config {"container" {"volumes" [{"hostPath" "/var/bunsen/scratch"
                                                  "containerPath" "/mnt/scratch"
                                                  "mode" "RW"}]}
                         "env" {"BEAKER_PASSWORD" "password"}}
                :defaults {"port" 8801
                           "cmd" ["sleep" "1000"]
                           "image" "quay.io/mojotech/debian"}}))

  (start-container "http://10.10.10.10:4243" "hello")

  (get-container "http://10.10.10.10:4243" "hello")

  (stop-container "http://10.10.10.10:4243" "hello")

  (remove-container "http://10.10.10.10:4243" "hello")

  )
