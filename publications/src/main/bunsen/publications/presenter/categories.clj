(ns bunsen.publications.presenter.categories
  (:require [bunsen.publications.helper.query :as q]
            [bunsen.publications.helper.entity :as e]))

(defn find-category[db eid]
  (e/load-entity db eid :category/name))

(defn find-categories [db]
  (let [q '{:find [?c]
            :where [[?c :category/name]]}]
    (->> (q/find-all {:db db :query q :pattern '[* :publication/_category]})
         (map #(assoc % :count (count (:publication/_category %)))))))
