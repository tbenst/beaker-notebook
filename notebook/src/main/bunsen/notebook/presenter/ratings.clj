(ns bunsen.notebook.presenter.ratings
  (:require [datomic.api :as d]
            [bunsen.notebook.presenter.publications :as pub]
            [bunsen.common.helper.utils :as utils]))

(defn find-rating [db user-id pub-id]
  (d/q '[:find (pull ?r [:db/id :rating/score]) .
         :in $ ?pid ?uid
         :where
         [?p :publication/public-id ?pid]
         [?p :publication/ratings ?r]
         [?r :rating/user-id ?uid]]
       db (utils/uuid-from-str pub-id) (utils/uuid-from-str user-id)))

(defn avg-rating [db pub-id]
  (->> (d/q '[:find (avg ?s)
              :in $ ?pid
              :where
              [?p :publication/public-id ?pid]
              [?p :publication/ratings ?r]
              [?r :rating/score ?s]]
            db (utils/uuid-from-str pub-id))
       ffirst
       (hash-map :rating)))

(defn rate-publication [conn {:keys [publication-id user-id score]}]
  (let [rating-id (:db/id (find-rating (d/db conn) user-id publication-id))
        pub (pub/find-publication (d/db conn) publication-id)
        rating-tx {:db/id (:db/id pub)
                   :publication/ratings [{:db/id rating-id
                                          :rating/user-id (utils/uuid-from-str user-id)
                                          :rating/score score}]}]
    @(d/transact conn [rating-tx])))
