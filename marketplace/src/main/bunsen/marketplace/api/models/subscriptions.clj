(ns bunsen.marketplace.api.models.subscriptions
  (:require [clojure.set :as set]
            [bunsen.common.helper.utils :as utils]
            [bunsen.common.helper.query :as q]
            [bunsen.marketplace.api.models.datasets :as datasets]
            [bunsen.marketplace.api.models.categories :as category]
            [bunsen.marketplace.helper.api :as helper]
            [datomic.api :as d]))

(defn retract-all-subscriptions!
  [conn]
  (->> (d/q '[:find [?s ...]
              :where [?s :subscription/data-set-id]]
            (d/db conn))
       (map (fn [eid] [:db.fn/retractEntity eid]))
       (d/transact conn)
       deref))

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

(defn get-subscriptions
  [config db user-id]
  (let [es-conn (helper/connect-to-es config)
        eids (d/q '[:find [?s ...]
                    :in $ ?user-id
                    :where [?s :subscription/user-id ?user-id]]
                  db
                  (utils/uuid-from-str user-id))
        subscriptions (d/pull-many db '[*] eids)
        subs-w-timestamps (map #(merge % (q/timestamps db (:db/id %))) subscriptions)
        dataset-ids (into [] (map #(:subscription/data-set-id %) subscriptions))
        datasets (datasets/find-by-ids es-conn dataset-ids)
        ds-with-cat (map #(assoc %
                                 :catalog
                                 (category/fetch es-conn (:index %) (datasets/dataset-catalog-path %)))
                         (:data datasets))
        subscriptions (map (fn [sub] (assoc sub
                                            :dataSet
                                            (into {} (filter #(and (= (str (:id %)) (:subscription/data-set-id sub))
                                                                   (= (:index %) (:subscription/index-name sub)))
                                                             ds-with-cat))))
                            subs-w-timestamps)]
        (map #(set/rename-keys % {:created-at :createdAt})
             subscriptions)))
