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
  (rest/post url (str "containers/" id "/start")))

(defn stop-container [url id]
  (rest/post url (str "containers/" id "/stop")))

(defn remove-container [url id]
  (rest/delete url (str "containers/" id)))

(defn container [{:keys [id token port image host-path container-path]}]
  {"Id" id
   "Env" [(str "BEAKER_COOKIE=" token)]
   "Image" image
   "Volumes" [{container-path {}}]
   "ExposedPorts" {(str port "/tcp") {}}
   "HostConfig" {"Binds" [(str host-path ":" container-path)]
                 "PortBindings" {(str port "/tcp")
                                 [{"HostPort" (str port)}]}}})
