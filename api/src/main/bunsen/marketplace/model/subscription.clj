(ns bunsen.marketplace.model.subscription
  (:require [datomic.api :as d]
            [bunsen.common.helper.query :as q]
            [bunsen.common.helper.utils :as u]))

(defn find-subscription-user-ids-by-dataset-id
  [datomic-db index-name dataset-id]
  (d/q '[:find [?ids ...]
         :in $ ?index-name ?data-set-id
         :where
         [?s :subscription/data-set-id ?data-set-id]
         [?s :subscription/index-name ?index-name]
         [?s :subscription/user-id ?ids]]
       datomic-db index-name dataset-id))

(defn find-subscriptions-by-user-id
  [datomic-db user-id]
  (->> (d/q '[:find [?s ...]
              :in $ ?user-id
              :where [?s :subscription/user-id ?user-id]]
            datomic-db
            (u/uuid-from-str user-id))
       (d/pull-many datomic-db '[*])
       (map
         #(merge % (q/timestamps datomic-db (:db/id %))))))

(defn create-subscription!
  [datomic-conn index-name dataset-id user-id]
  (let [subscription {:db/id (d/tempid :db.part/user)
                      :subscription/index-name index-name
                      :subscription/data-set-id dataset-id
                      :subscription/user-id (u/uuid-from-str user-id)}]
    @(d/transact datomic-conn [subscription])))

(defn retract-subscription!
  [datomic-conn index-name dataset-id user-id]
  (let [eid (d/q '[:find ?s
                   :in $ ?index-name ?dataset-id ?user-id
                   :where
                   [?s :subscription/data-set-id ?dataset-id]
                   [?s :subscription/index-name ?index-name]
                   [?s :subscription/user-id ?user-id]]
                 (d/db datomic-conn)
                 index-name
                 dataset-id
                 (u/uuid-from-str user-id))]
    @(d/transact datomic-conn [[:db.fn/retractEntity (ffirst eid)]])))

(defn subscribed?
  [datomic-db index-name dataset-id user-id]
  (d/q '[:find ?s .
         :in $ ?index-name ?dataset-id ?user-id
         :where
         [?s :subscription/data-set-id ?dataset-id]
         [?s :subscription/index-name ?index-name]
         [?s :subscription/user-id ?user-id]]
       datomic-db
       index-name
       dataset-id
       (u/uuid-from-str user-id)))
