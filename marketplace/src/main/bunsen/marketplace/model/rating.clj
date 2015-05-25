(ns bunsen.marketplace.model.rating
  (:require [datomic.api :as d]
            [bunsen.common.helper.utils :as u]))

(defn get-average-rating
  [datomic-db index-name dataset-id]
  {:average
   (d/q '[:find (avg ?score) .
          :in $ ?index-name ?data-set-id
          :where
          [?ratings :rating/data-set-id ?data-set-id]
          [?ratings :rating/index-name ?index-name]
          [?ratings :rating/score ?score]]
        datomic-db index-name (str dataset-id))})

(defn get-rating
  [datomic-db index-name dataset-id user-id]
  (or (d/q '[:find (pull ?rating [*]) .
             :in $ ?index-name ?dataset-id ?user-id
             :where
             [?rating :rating/user-id ?user-id]
             [?rating :rating/data-set-id ?dataset-id]
             [?rating :rating/index-name ?index]]
           datomic-db index-name (str dataset-id) (u/uuid-from-str user-id))
      {:score 0}))

(defn create-rating!
  [datomic-conn index-name dataset-id user-id rating]
  (let [score (:score rating)
        rating (get-rating (d/db datomic-conn) index-name dataset-id user-id)
        rating-tx {:db/id (or (:db/id rating) (d/tempid :db.part/user))
                   :rating/user-id (u/uuid-from-str user-id)
                   :rating/data-set-id (str dataset-id)
                   :rating/index-name index-name
                   :rating/score score}]
    @(d/transact datomic-conn [rating-tx])))
