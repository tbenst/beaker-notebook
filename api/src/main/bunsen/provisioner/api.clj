(ns bunsen.provisioner.api
  (:require [clojure.string :as str]
            [crypto.random :as random]
            [bunsen.provisioner.model.beaker :as b]
            [bunsen.provisioner.protocol.container :as container]))

(defn- with-id
  [container user-id]
  (assoc container :id user-id))

(defn- with-user
  [container config remote-user]
  (assoc container :user (if remote-user
                           ; todo:  should this be parsed by Resource?
                           (first (str/split remote-user #"@"))
                           (:default-user config))))

(defn- with-routing
  [container config user-id]
  (let [bamboo {"BAMBOO_HOST" (:bamboo-host config)
                "BAMBOO_PATH" (str "/beaker/" user-id "/")}
        bamboo-sans-nils (into {} (remove #(nil? (val %)) bamboo))]
    (update-in container [:env] merge bamboo-sans-nils)))

(defn- with-security
  [container remote-user token]
  (update-in container [:env] merge {"BEAKER_COOKIE" token
                                     "USE_SSL" "true"
                                     "AUTHORIZED_USER" remote-user}))

(defn- with-volumes
  [container config user-id]
  (update-in container [:volumes] conj {:mode "RW"
                                        :host (str (:store-root config) "/" user-id)
                                        :container "/mnt/scratch"}))

(defn create-container!
  [{conn :conn user-id :user-id config :config container :container remote-user :remote-user}]
  (let [beaker (b/find-or-create-beaker! conn {:user-id user-id})]
    (-> (container/default container)
        (with-id user-id)
        (with-user config remote-user)
        (with-routing config user-id)
        (with-security remote-user (:beaker/token beaker))
        (with-volumes config user-id)
        (->> (container/create! container))
        (assoc :token (:beaker/token beaker)))))

(defn inspect-container
  [container id]
  (container/inspect container id))
