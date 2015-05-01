(ns bunsen.marketplace.api.models.subscriptions
  (:require [bunsen.common.helper.utils :as utils]
            [datomic.api :as d]))

(defn subscribe
  [conn index-name data-set-id user-id]
  (let [subscription {:db/id (d/tempid :db.part/user)
                      :subscription/index-name index-name
                      :subscription/data-set-id data-set-id
                      :subscription/user-id (utils/uuid-from-str user-id)}]
    @(d/transact conn [subscription])))

(defn unsubscribe
  [conn index-name data-set-id user-id]
  (let [eid (d/q '[:find ?s
                   :in $ ?index-name ?data-set-id ?user-id
                   :where [?s :subscription/data-set-id ?data-set-id]
                          [?s :subscription/index-name ?index-name]
                          [?s :subscription/user-id ?user-id]]
                  (d/db conn)
                  index-name
                  data-set-id
                  (utils/uuid-from-str user-id))]
    @(d/transact conn [[:db.fn/retractEntity (ffirst eid)]])))
