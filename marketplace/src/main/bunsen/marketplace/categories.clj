(ns bunsen.marketplace.categories
  (:require [bunsen.marketplace.base :as base]
            [clojure.data.json :as json]
            [clojurewerkz.elastisch.rest.document :as doc]
            [clojurewerkz.elastisch.rest.index :as ind]
            [clojurewerkz.elastisch.rest.response :as res]
            [clojurewerkz.elastisch.query :as q]
            ))

(defn add-id-for-elastisch
  "Adds the _id element (copied from existing 'id') to each category"
  [categories]
  (map (fn [cat] (assoc cat :_id (:id cat)))
       categories))

(defn ->json-for-elastisch
  "Reads a JSON array of preformatted categories data from a string,
  and copies the the id attribute of each element over to _id for
  digestion by elastisch"
  [raw]
  (add-id-for-elastisch (json/read-str raw :key-fn keyword)))

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
                               {:count count}))

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


(defn update-mappings!
  "Updates mappings to avoid indexing filter fields for the index's catalogs."
  [es-conn index-name categories]
  (let [metas (->> (vals categories)
                   (map :metadata)
                   (keep identity))
        filter-fields (mapcat (fn [meta]
                                (filter (fn [[k v]] (contains?
                                                      (set (:indexes v))
                                                      "filter"))
                                        meta)) metas)
        filter-names (map first filter-fields)
        mappings (into {} (map
                            (fn [f] [f {:type "string" :index "not_analyzed"}])
                            filter-names))
        req {:datasets {:properties mappings}}]
    (ind/update-mapping es-conn index-name "datasets" :mapping req)
    ))
