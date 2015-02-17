(ns bunsen.indexer.categories
  (:require [bunsen.indexer.base :as base]
            [clojurewerkz.elastisch.rest.document :as doc]
            [clojurewerkz.elastisch.rest.response :as res]
            [clojurewerkz.elastisch.query :as q]
            ))

(defn fetch-count
  "Isses an ES query for the count for the datasets belonging
  a given category path"
  [es-conn index-name path]
  (doc/count
   es-conn index-name "datasets"
   (q/bool {:should [(q/prefix :path (str path "."))
                     (q/term :path path)]})))

(defn parse-count
  "Given an ES response, return [:result count-from-response]"
  [response]
  (res/count-from response))

(defn update-es-count!
  "Given a specific entity id in elastic search, update its count attribute
  in place"
  [id es-conn index-name mapping-type count]
  (doc/update-with-partial-doc es-conn index-name mapping-type id
                               {:doc {:count count}}))

(defn cache-subtree-count!
  [es-conn index-name id path]
  (base/index! es-conn index-name "categories" path
               (partial fetch-count es-conn index-name)
               parse-count
               (partial update-es-count! id))
  )

(defn update-counts!
  "Given ES connection and category map, updates count attributes of
  all categories therein"
  [es-conn index-name categories]
  (doseq [category categories]
    (let [[id {:keys [path] :as attrs}] category]
      (await-for 5000 (cache-subtree-count! es-conn index-name id path)))))
