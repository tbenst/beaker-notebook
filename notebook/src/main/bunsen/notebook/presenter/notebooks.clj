(ns bunsen.notebook.presenter.notebooks
  (:require [datomic.api :as d]
            [clojure.string :as str]
            [bouncer.core :as b]
            [bouncer.validators :as v]
            [bunsen.common.helper.utils :as u]
            [bunsen.common.helper.query :as q]))

(defn unique-name? [name project-id db]
  (empty? (d/q '[:find ?n
                 :in $ ?name ?project-id
                 :where [?n :notebook/name ?name]
                        [?p :project/public-id ?project-id]
                        [?n :notebook/project ?p]]
                db name project-id)))

(defn find-notebook-with-name [db project-id user-id name]
  (d/q '[:find (pull ?n [*]) .
         :in $ ?name ?pid ?uid
         :where [?n :notebook/name ?name]
                [?n :notebook/user-id ?uid]
                [?p :project/public-id ?pid]
                [?n :notebook/project ?p]]
       db name project-id user-id))

(defn find-notebook [db notebook-id user-id]
  (d/q '[:find (pull ?n [* {:notebook/project [:project/public-id]}]) .
         :in $ [?n-id ?u-id]
         :where [?n :notebook/public-id ?n-id]]
       db (mapv u/uuid-from-str [notebook-id user-id])))

(defn validate-notebook [db params notebook-id user-id]
  (let [name (:name params)
        user-uuid (u/uuid-from-str user-id)
        project-id (-> (find-notebook db notebook-id user-id) :notebook/project :project/public-id)
        n (and name (find-notebook-with-name db project-id user-uuid name))]
    (cond (and n (not= (:notebook/public-id n) (u/uuid-from-str notebook-id)))
            (first (b/validate {:name name}
                               :name [v/required [unique-name? project-id db
                                                   :message "That name is taken by another notebook in this project."]]))
          :else nil)))

(defn load-notebook [db notebook-id user-id]
  (when-let [n (find-notebook db notebook-id user-id)]
    (dissoc n :db/id)))

(defn calculate-notebook-name [db user-id project-id]
  (let [names (d/q '[:find [?name ...]
                     :in $ [?uid ?pid]
                     :where [?p :project/public-id ?pid]
                            [?p :project/owner-id ?uid]
                            [?n :notebook/project ?p]
                            [?n :notebook/name ?name]]
                   db (mapv u/uuid-from-str [user-id project-id]))
        numbered-names (filter #(re-matches #"Notebook (\d+)" %)
                               names)
        max-n (reduce #(let [match (second (re-matches #"Notebook (\d+)" %2))
                             num (Integer. match)]
                         (if (> num %1) num %1)) 0 numbered-names)]
    (str "Notebook " (+ max-n 1))))

(defn notebook-project-eid [db project-id user-id]
  (d/q '[:find ?p .
         :in $ [?pid ?uid]
         :where [?p :project/public-id ?pid]
                [?p :project/owner-id ?uid]]
        db (mapv u/uuid-from-str [project-id user-id])))

(defn create-notebook! [conn params]
  (let [p-eid (notebook-project-eid (d/db conn) (:project-id params) (:user-id params))
        name (or (:name params) (calculate-notebook-name (d/db conn) (:user-id params) (:project-id params)))
        contents (or (:content params) (u/read-resource-file "notebooks/base_notebook.bkr"))
        n {:db/id (d/tempid :db.part/user)
           :notebook/public-id (d/squuid)
           :notebook/name name
           :notebook/project p-eid
           :notebook/contents contents
           :notebook/created-at (or (:created-at params ) (java.util.Date.))
           :notebook/updated-at (or (:updated-at params ) (java.util.Date.))
           :notebook/user-id (u/uuid-from-str (:user-id params))}]
    @(d/transact conn [(u/remove-nils n)])
    (dissoc n :db/id)))

(defn include-opened-at [params]
  (if (:open params)
    (assoc params :opened-at (java.util.Date.))
    params))

(defn update-notebook! [conn notebook-id user-id params]
  (when-let [n (find-notebook (d/db conn) notebook-id user-id)]
    (let [tx (-> params
                 include-opened-at
                 (dissoc :public-id :id :notebook-id)
                 u/remove-nils
                 (assoc :db/id (:db/id n)
                        :notebook/updated-at (java.util.Date.)))]
        @(d/transact conn [tx])
        (-> (find-notebook (d/db conn) notebook-id user-id)
          (dissoc :db/id))))

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
