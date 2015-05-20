(ns bunsen.notebook.presenter.categories
  (:require [datomic.api :as d]
            [bunsen.common.helper.utils :as utils]
            [bunsen.notebook.helper.query :as q]
            [bunsen.notebook.helper.entity :as e]))

(defn find-category [db cat-id]
  (d/q '[:find (pull ?c [*]) .
         :in $ ?cid
         :where
         [?c :category/public-id ?cid]]
       db (utils/uuid-from-str cat-id)))

(defn create-category [conn attrs]
  (d/transact conn (e/insert-or-update-tx attrs)))

(defn find-categories [db]
  (let [q '{:find [?c]
            :where [[?c :category/name]]}]
    (->> (q/find-all {:db db :query q :pattern '[* :publication/_category]})
         (map #(assoc % :count (count (:publication/_category %)))))))
