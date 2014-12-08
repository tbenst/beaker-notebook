(ns bunsen.provisioner.helper.bamboo
  (:require [bunsen.provisioner.helper.rest :as rest]
            [clojure.string :as str]
            [cemerick.url :refer [url-encode]]))

(defn list-services [host]
  (rest/get host "api/services"))

(defn get-service [host id]
  (let [services (list-services host)]
    (get services id)))

(defn update-service [host id service]
  ;; not a very pretty api
  (let [id (-> id url-encode url-encode)]
    (rest/put host (str "api/services/" id) {:form-params service})))

(defn create-service [host service]
  (rest/post host "api/services" {:form-params service}))

(defn create-or-update-service [host id service]
  (if-let [service* (get-service host id)]
    (if (= service service*)
      service
      (update-service host id service))
    (create-service host service)))

(defn host-acl [host]
  (format "{ hdr_dom(host) -i %s }" host))

(defn path-acl [path]
  (format "{ path_beg -i %s }" path))

(defn service [{:keys [id host path]}]
  {"Id" id
   "Acl" (str/join
           " "
           (filter identity
                   [(when host
                      (host-acl host))
                    (when path
                      (path-acl path))]))})
