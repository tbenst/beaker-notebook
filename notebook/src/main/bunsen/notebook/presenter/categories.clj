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

(defn fix-contributors-format [contributors]
  (->> contributors
       (sort-by first >)
       (take 5)
       (map #(second %))))

(defn contributors [db]
  (-> (d/q '[:find (count ?p) ?aid
             :in $
             :where [?p :publication/author-id ?aid]]
           db)
      fix-contributors-format))

(defn contributors-by-cat [db category-id]
  (-> (d/q '[:find (count ?p) ?aid
             :in $ ?cid
             :where [?p :publication/author-id ?aid]
                    [?c :category/public-id ?cid]
                    [?p :publication/category ?c]]
           db (utils/uuid-from-str category-id))
      fix-contributors-format))
