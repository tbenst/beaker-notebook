(ns bunsen.notebook.presenter.project
  (:require [datomic.api :as d]
            [clojure.instant :as inst]
            [bunsen.common.helper.utils :as utils]
            [bouncer.core :as b]
            [bouncer.validators :as v]))

(defn find-project [db owner-id project-id]
  (d/q '[:find (pull ?p [:db/id :project/name :project/description :project/created-at
                         :project/public-id :project/updated-at :project/owner-id
                           {:notebook/_project [:notebook/public-id :notebook/name
                                                :notebook/open :notebook/opened-at
                                                :notebook/created-at :notebook/updated-at]}]) .
         :in $ [?oid ?pid]
         :where
         [?p :project/public-id ?pid]
         [?p :project/owner-id ?oid]]
       db (mapv utils/uuid-from-str [owner-id project-id])))

(defn load-project [db owner-id project-id]
  (when-let [p (when (and owner-id project-id)
                 (find-project db owner-id project-id))]
    (dissoc p :db/id)))

(defn create-project! [conn owner-id {:keys [name description created-at updated-at]}]
  (let [p {:db/id (d/tempid :db.part/user)
           :project/public-id (d/squuid)
           :project/created-at (if created-at (inst/read-instant-timestamp created-at) (utils/now))
           :project/updated-at (if updated-at (inst/read-instant-timestamp updated-at) (utils/now))
           :project/name name
           :project/description description
           :project/owner-id (utils/uuid-from-str owner-id)}]
    @(d/transact conn [(utils/remove-nils p)])
    (dissoc p :db/id)))

(defn update-project! [conn owner-id project-id params]
  (when-let [p (find-project (d/db conn) owner-id project-id)]
    (let [tx (-> params
                 (dissoc :public-id :project-id)
                 utils/remove-nils
                 (utils/namespace-keys "project")
                 (assoc :db/id (:db/id p) :project/updated-at (utils/now)))]
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

(defn find-projects [db owner-id]
  (d/q '[:find [(pull ?p [* {:notebook/_project [:notebook/public-id :notebook/name
                                                 :notebook/open :notebook/opened-at
                                                 :notebook/created-at :notebook/updated-at]}]) ...]
         :in $ ?oid
         :where
         [?p :project/owner-id ?oid]]
       db (utils/uuid-from-str owner-id)))
