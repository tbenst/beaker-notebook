(ns bunsen.notebook.presenter.notebooks
  (:require [datomic.api :as d]
            [bunsen.common.helper.utils :as u]
            [bunsen.common.helper.query :as q]))

(defn unique-name? [db name project-id]
  (empty? (d/q '[:find ?n
                 :in $ ?name ?project-id
                 :where [?n :notebook/name ?name]
                        [?n :notebook/project-id ?project-id]]
        db name project-id)))

(defn find-notebook [db notebook-id user-id]
  (d/q '[:find (pull ?n [*]) .
         :in $ [?nid ?uid]
         :where [?n :notebook/public-id ?nid]]
       db (mapv u/uuid-from-str [notebook-id user-id])))

(defn load-notebook [db notebook-id user-id]
  (when-let [n (find-notebook db notebook-id user-id)]
    (dissoc n :db/id)))

(defn create-notebook! [conn params]
  (when (unique-name? (d/db conn) (:name params) (:project-id params))
    (let [n {:db/id (d/tempid :db.part/user)
             :notebook/public-id (d/squuid)
             :notebook/name (:name params)
             :notebook/contents (:contents params)
             :notebook/project-id (:project-id params)
             :notebook/created-at (or (:created-at params ) (java.util.Date.))
             :notebook/updated-at (or (:updated-at params ) (java.util.Date.))
             :notebook/user-id (u/uuid-from-str (:user-id params))}]
      @(d/transact conn [(u/remove-nils n)])
      (dissoc n :db/id))))

(defn include-opened-at [params]
  (if (:open params)
    (assoc params :opened-at (java.util.Date.))
    params))

(defn update-notebook! [conn notebook-id user-id params]
  (when-let [n (find-notebook (d/db conn) notebook-id user-id)]
    (when (or (= (:name params) (:notebook/name n))
              (unique-name? (d/db conn) (:name params) (:notebook/project-id n)))
      (let [tx (-> params
                   include-opened-at
                   (dissoc :public-id :id :notebook-id)
                   u/remove-nils
                   (assoc :db/id (:db/id n)
                          :notebook/updated-at (java.util.Date.)))]
        @(d/transact conn [tx])
        tx))))

(defn delete-notebook! [conn notebook-id user-id]
  (when-let [n (find-notebook (d/db conn) notebook-id user-id)]
    @(d/transact conn [[:db.fn/retractEntity (:db/id n)]])))

(defn user-notebooks [db user-id]
  (let [user-id (u/uuid-from-str user-id)]
    (d/q '[:find [(pull ?notebook [* {:notebook/project [:project/public-id]}]) ...]
           :in $ ?user-id
           :where [?notebook :notebook/user-id ?user-id]]
         db user-id)))

(defn project-notebooks [db user-id project-id]
  (let [user-id (u/uuid-from-str user-id)
        project-id (u/uuid-from-str project-id)]
    (d/q '[:find [(pull ?notebook [* {:notebook/project [:project/public-id]}]) ...]
           :in $ ?user-id ?project-id
           :where [?notebook :notebook/user-id ?user-id]
                  [?project :project/public-id ?project-id]
                  [?notebook :notebook/project ?project]]
         db user-id project-id)))
