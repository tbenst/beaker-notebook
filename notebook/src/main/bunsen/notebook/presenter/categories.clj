(ns bunsen.notebook.presenter.categories
  (:require [datomic.api :as d]
            [bunsen.common.helper.utils :as utils]
            [bunsen.notebook.helper.query :as q]))

(defn find-category [db cat-id]
  (d/q '[:find (pull ?c [*]) .
         :in $ ?cid
         :where
         [?c :category/public-id ?cid]]
       db (utils/uuid-from-str cat-id)))

(defn create-category [conn {:keys [name description]}]
  (let [c {:db/id (d/tempid :db.part/user)
           :category/public-id (d/squuid)
           :category/name name
           :category/description description}]
    @(d/transact conn [(utils/remove-nils c)])
    (dissoc c :db/id)))

(defn find-categories [db]
  (let [q '{:find [?c]
            :where [[?c :category/name]]}]
    (->> (q/find-all {:db db :query q :pattern '[* :publication/_category]})
         (map #(assoc % :count (count (:publication/_category %)))))))
