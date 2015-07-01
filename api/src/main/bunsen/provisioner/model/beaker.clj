(ns bunsen.provisioner.model.beaker
  (:require [datomic.api :as d]
            [crypto.random :as random]
            [bunsen.common.helper.utils :as utils]))

(defn create-beaker! [conn {:keys [user-id]}]
  (let [beaker {:db/id (d/tempid :db.part/user)
                :beaker/user-id (utils/uuid-from-str  user-id)
                :beaker/token (random/hex 20)}]
    @(d/transact conn [beaker])
    (dissoc beaker :db/id)))

(defn find-beaker-by-user-id [db user-id]
  (-> (d/q '[:find [(pull ?beaker [*])]
             :in $ ?id
             :where [?beaker :beaker/user-id ?id]]
           db (utils/uuid-from-str user-id))
      first))

(defn find-or-create-beaker! [conn {:keys [user-id] :as params}]
  (if-let [user (find-beaker-by-user-id (d/db conn) user-id)]
    user
    (create-beaker! conn params)))
