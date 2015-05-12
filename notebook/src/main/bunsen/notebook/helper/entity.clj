(ns bunsen.notebook.helper.entity
  (:require [datomic.api :as d]
            [bunsen.notebook.helper.query :as q]))

(defn insert-or-update-tx [attrs]
  [(merge {:db/id (d/tempid :db.part/user)} attrs)])

(defn load-entity
  "Loads and returns entity of a given type with all attributes and timestamps.
  The entity type is an attribute common to all entities of that kind (view this as simple type checking)."
  [db eid entity-type]
  (let [q {:find ['?e]
           :in ['$ '?e]
           :where [['?e] ['?e entity-type]]}]
    (if-let [e (q/find-one {:db db, :query q, :pattern '[*], :args [eid]})]
      (merge e (q/timestamps db eid)))))
