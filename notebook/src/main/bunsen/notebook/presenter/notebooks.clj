(ns bunsen.notebook.presenter.notebooks
  (:require [datomic.api :as d]
            [clojure.string :as str]
            [clojure.instant :as inst]
            [clojure.data.json :as json]
            [bouncer.core :as b]
            [bouncer.validators :as v]
            [bunsen.notebook.presenter.project :as p]
            [bunsen.notebook.presenter.publications :as pub]
            [bunsen.notebook.helper.notebook :as nb-helper]
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

(def notebook-pattern
  [:db/id
   :notebook/name
   :notebook/public-id
   :notebook/contents
   :notebook/updated-at
   :notebook/user-id
   :notebook/created-at
   :notebook/opened-at
   :notebook/open
   {:notebook/project [:project/public-id]}
   {:publication/_notebook [:publication/public-id
                            :publication/created-at
                            :publication/updated-at
                            :publication/description
                            {:publication/category [:category/public-id]}]}])

(defn find-notebook [db notebook-id user-id]
  (d/q '[:find (pull ?n pattern) .
         :in $ pattern [?n-id ?u-id]
         :where [?n :notebook/public-id ?n-id]]
       db notebook-pattern (mapv u/uuid-from-str [notebook-id user-id])))

(defn valid-json? [contents]
  (let [exception (try (json/read-str contents)
                       (catch java.lang.Exception e e))]
    (when (and (instance? Exception exception)
               (not (re-matches #"JSON error.*" (.getMessage exception))))
      (throw exception))
    (if (and (= java.lang.Exception (class exception))
             (re-matches #"JSON error.*" (.getMessage exception)))
      false
      true)))


(defn validate-imported-notebook [db {:keys [contents name pid uid]}]
  (let [project (p/find-project db uid pid)]
    (first (b/validate {:name name :contents contents :owner-id (u/uuid-from-str uid)}
                       :name [v/required [unique-name? (u/uuid-from-str pid) db
                                           :message "That name is taken by another notebook in this project."]]
                       :owner-id [v/required [= (:project/owner-id project)
                                               :message "You are not the owner of that project."]]
                       :contents [v/required [valid-json?
                                               :message (str "Could not import notebook " name " Beaker notebooks must contain valid JSON.")]]))))

(defn validate-notebook [db params notebook-id user-id]
  (let [name (:name params)
        user-uuid (u/uuid-from-str user-id)
        new-project-id (:project-id params)
        new-project (and new-project-id (p/find-project db user-id new-project-id))
        notebook (find-notebook db notebook-id user-id)
        current-pid (-> notebook :notebook/project :project/public-id)
        nbk-name (:notebook/name notebook)
        n (and name (find-notebook-with-name db current-pid user-uuid name))]
    (cond (and n (not= (:notebook/public-id n) (u/uuid-from-str notebook-id)))
            (first (b/validate {:name name}
                               :name [v/required [unique-name? current-pid db
                                                   :message "That name is taken by another notebook in this project."]]))
          new-project
            (first (b/validate {:owner-id (:project/owner-id new-project) :name nbk-name}
                               :owner-id [[= user-uuid
                                           :message "You are not the owner of that project"]]
                               :name [v/required [unique-name? (:project/public-id new-project) db
                                                   :message "That name is taken by another notebook in this project."]]))
          :else nil)))

(defn load-notebook [db notebook-id user-id]
  (when-let [n (find-notebook db notebook-id user-id)]
    (-> (dissoc n :db/id)
        nb-helper/fix-notebook-format
        (assoc :publication (pub/find-notebook-publication db notebook-id user-id)))))

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

(defn create-notebook! [conn {:keys [created-at updated-at opened-at open] :as params}]
  (let [p-eid (notebook-project-eid (d/db conn) (:project-id params) (:user-id params))
        name (or (:name params) (calculate-notebook-name (d/db conn) (:user-id params) (:project-id params)))
        contents (or (:contents params) (u/read-resource-file "notebooks/base_notebook.bkr"))
        n {:db/id (d/tempid :db.part/user)
           :notebook/public-id (d/squuid)
           :notebook/name name
           :notebook/project p-eid
           :notebook/contents contents
           :notebook/open (if open (Boolean/valueOf open) true)
           :notebook/opened-at  (if opened-at (inst/read-instant-timestamp opened-at) (java.util.Date.))
           :notebook/created-at (if created-at (inst/read-instant-timestamp created-at) (java.util.Date.))
           :notebook/updated-at (if updated-at (inst/read-instant-timestamp updated-at) (java.util.Date.))
           :notebook/user-id (u/uuid-from-str (:user-id params))}]
    @(d/transact conn [(u/remove-nils n)])
    (dissoc n :db/id)))

(defn include-opened-at [params notebook]
  (if (and (:open params)
           (not (:notebook/open notebook)))
    (assoc params :opened-at (java.util.Date.))
    params))

(defn update-notebook! [conn notebook-id user-id params]
  (when-let [n (find-notebook (d/db conn) notebook-id user-id)]
    (let [p-eid (and (:project-id params) (notebook-project-eid (d/db conn) (:project-id params)  user-id))
          tx (-> params
                 (include-opened-at n)
                 (dissoc :public-id :id :notebook-id :project-id)
                 (assoc :project p-eid
                        :updated-at (java.util.Date.))
                 u/remove-nils
                 (u/namespace-keys "notebook")
                 (assoc :db/id (:db/id n)))]
      @(d/transact conn [tx])
      (-> (find-notebook (d/db conn) notebook-id user-id)
          (dissoc :db/id)))))

(defn delete-notebook! [conn notebook-id user-id]
  (when-let [n (find-notebook (d/db conn) notebook-id user-id)]
    @(d/transact conn [[:db.fn/retractEntity (:db/id n)]])))

(defn user-notebooks [db user-id]
  (let [user-id (u/uuid-from-str user-id)
        notebooks (d/q '[:find [(pull ?notebook pattern) ...]
                         :in $ pattern ?user-id
                         :where [?notebook :notebook/user-id ?user-id]]
                       db notebook-pattern user-id)]
    (map nb-helper/fix-notebook-format notebooks)))

(defn project-notebooks [db user-id project-id]
  (let [user-id (u/uuid-from-str user-id)
        project-id (u/uuid-from-str project-id)
        notebooks (d/q '[:find [(pull ?notebook pattern) ...]
           :in $ pattern ?user-id ?project-id
           :where [?notebook :notebook/user-id ?user-id]
                  [?project :project/public-id ?project-id]
                  [?notebook :notebook/project ?project]]
                       db notebook-pattern user-id project-id)]

    (map nb-helper/fix-notebook-format notebooks)))
