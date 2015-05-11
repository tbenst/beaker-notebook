(ns bunsen.marketplace.api.models.ratings
  (:require [datomic.api :as d]))

(defn user-rating [db data-set-id index user-id]
  (d/q '[:find (pull ?rating [*]) .
         :in $ ?data-set-id ?user-id ?index
         :where [?rating :rating/user-id ?user-id]
                [?rating :rating/data-set-id ?data-set-id]
                [?rating :rating/index-name ?index]]
        db data-set-id user-id index))

(defn avg-rating [db data-set-id index]
  {:average (d/q '[:find (avg ?score) .
                   :in $ ?data-set-id ?index
                   :where [?ratings :rating/data-set-id ?data-set-id]
                          [?ratings :rating/index-name ?index]
                          [?ratings :rating/score ?score]]
                  db data-set-id index)})

(defn rate-data-set [conn data-set-id index user-id score]
  (let [rating (user-rating (d/db conn) data-set-id index user-id)
        rating-tx {:db/id (or (:db/id rating) (d/tempid :db.part/user))
                   :rating/user-id user-id
                   :rating/data-set-id data-set-id
                   :rating/index-name index
                   :rating/score score}]
    @(d/transact conn [rating-tx])))
