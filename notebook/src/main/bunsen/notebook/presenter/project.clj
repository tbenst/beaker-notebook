(ns bunsen.notebook.presenter.project
  (:require [datomic.api :as d]
            [bunsen.common.helper.utils :as utils]
            [bouncer.core :as b]
            [clj-time.core :as time]
            [bouncer.validators :as v]))

(defn find-project [db owner-id project-id]
  (d/q '[:find (pull ?p [*]) .
         :in $ [?oid ?pid]
         :where
         [?p :project/public-id ?pid]
         [?p :project/owner-id ?oid]]
       db (mapv utils/uuid-from-str [owner-id project-id])))

(defn load-project [db owner-id project-id]
  (when-let [p (when (and owner-id project-id)
                 (find-project db owner-id project-id))]
    (dissoc p :db/id)))

(defn create-project! [conn owner-id {:keys [name description]}]
  (let [p {:db/id (d/tempid :db.part/user)
           :project/public-id (d/squuid)
           :project/created-at (time/now)
           :project/updated-at (time/now)
           :project/name name
           :project/description description
           :project/owner-id (utils/uuid-from-str owner-id)}]
    @(d/transact conn [(utils/remove-nils p)])
    (dissoc p :db/id)))

(defn update-project! [conn owner-id project-id params]
  (when-let [p (find-project (d/db conn) owner-id project-id)]
    (let [tx (-> params
                 (dissoc :public-id :id)
                 utils/remove-nils
                 (utils/namespace-keys "project")
                 (assoc :db/id (:db/id p) :project/updated-at (time/now)))]
      @(d/transact conn [tx])
      tx)))

(defn delete-project! [conn owner-id project-id]
  (when-let [p (find-project (d/db conn) owner-id project-id)]
    @(d/transact conn [[:db.fn/retractEntity (:db/id p)]])))

(defn find-another-project-with-name [db owner-id project-id name]
  (d/q '[:find (pull ?p [*]) .
         :in $ [?n ?oid ?pid]
         :where
         [?p :project/name ?n]
         [?p :project/owner-id ?oid]
         [?p :project/public-id ?id]
         [(not= ?id ?pid)]]
       db [name (utils/uuid-from-str owner-id) (if project-id (utils/uuid-from-str project-id) nil)]))

(defn unique-project-name? [name project-id owner-id db]
  (not (find-another-project-with-name db owner-id project-id name)))

(defn validate-project [db owner-id project-id params]
  (-> (b/validate (select-keys params [:name :owner-id])
                  :name [v/required [unique-project-name? project-id owner-id db
                                     :message "project with this name already exists"]])
      first))
