(ns bunsen.publications.presenter.ratings
  (:require [bunsen.publications.helper.query :as q]
            [datomic.api :as d]
            [bunsen.publications.helper.entity :as e]))

(defn find-rating [db publication-id user-id]
  (let [query '[:find ?rating
                :in $ ?publication ?user
                :where
                [?publication :publication/ratings ?rating]
                [?rating :rating/user ?user]]]
    (q/find-one {:db db
                 :query query
                 :pattern '[:db/id :rating/score]
                 :args [publication-id user-id]})))

(defn avg-rating [db publication-id]
  (->> (d/q '[:find (avg ?score)
              :in $ ?publication
              :where
              [?publication]
              [?publication :publication/ratings ?rating]
              [?rating :rating/score ?score]]
            db publication-id)
       ffirst
       (hash-map :rating)))

(defn rate-publication [conn {:keys [publication-id user-id score]}]
  (let [rating-id (:db/id (find-rating (d/db conn) publication-id user-id))
        rating-tx {:db/id publication-id
                   :publication/ratings [{:db/id rating-id
                                          :rating/user user-id
                                          :rating/score score}]}]
    (d/transact conn [rating-tx])))



