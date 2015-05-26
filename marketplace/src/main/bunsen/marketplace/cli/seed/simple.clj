(ns bunsen.marketplace.cli.seed.simple
  (:require [clojure.data.json :as json]
            [bunsen.marketplace.helper.elasticsearch :as es]))

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

(defn index-categories!
  [es-conn index-name filename]
  (es/index! es-conn index-name "categories" filename
             slurp
             ->json-for-elastisch
             es/bulk-to-es!))

(defn indexable-dataset
  "Generate a dataset in canonical form, ready to passed as a call to index in
   Elastische.  cat-ids refers to a list of id's of categories, which are presumed
   to already exist in the indexed-categories param."
  [id title cat-ids indexed-categories extra-attrs]
  (let [cats (map #(select-keys (or
                                  (get indexed-categories %1)
                                  (get indexed-categories (str %1))) [:id :name :path])
                  cat-ids)]
    (merge extra-attrs
           {:_id id ; Required for Elastische API
            :id id
            :title title
            :categories cats})))

(defn prepare-dataset
  [categories node]
  (indexable-dataset (:id node) (:title node) (:categoryIds node) categories node))

(defn index-datasets!
  [es-conn index-name filename categories]
  (es/index! es-conn index-name "datasets" filename
             slurp
             (fn [result]
               (map (partial prepare-dataset categories)
                    (json/read-str result :key-fn keyword)))
             es/bulk-to-es!))
