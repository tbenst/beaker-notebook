(ns bunsen.marketplace.categories
  (:require [bunsen.marketplace.base :as base]
            [bunsen.marketplace.api.models.categories :as categories]
            [clojure.data.json :as json]
            [clojurewerkz.elastisch.rest.document :as doc]
            [clojurewerkz.elastisch.rest.index :as ind]))

(def add-id-for-elastisch categories/add-id-for-elastisch)

(defn ->json-for-elastisch
  "Reads a JSON array of preformatted categories data from a string,
  and copies the the id attribute of each element over to _id for
  digestion by elastisch"
  [raw]
  (add-id-for-elastisch (json/read-str raw :key-fn keyword)))

(def fetch-count categories/fetch-count)

(def parse-count categories/parse-count)

(def update-es-count! categories/update-es-count!)

(def update-counts! categories/update-counts!)

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
    (ind/update-mapping es-conn index-name "datasets" :mapping req)))
