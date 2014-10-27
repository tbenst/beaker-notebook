(ns bunsen.indexer.two-sigma.categories
  (:require [bunsen.indexer.base :as base]))

(def root-path "0.")

(defn metadata-for-root
  []
  (base/json-resource "two_sigma/category_metadata.json"))
(def metadata-memo (memoize metadata-for-root))

(defn cat-name
  [category]
  (or (:name category) "Two Sigma"))

(defn cat-id
  [category]
  (str (or (:id category) 0)))

(defn parse-category
  "Parses a category and all of its children, and adds them to :list key of the accumulator. Recurses for each element in the children attribute of \"category\" param.  Categories' path will incorporate the :path-prefix specified in \"acc\" param."
  [acc category]
  (let [prefix (:path-prefix acc)
        path (str prefix (:index acc))
        metadata (when (= prefix root-path) {:metadata (metadata-memo)})
        payload (merge {:name (cat-name category)
                        :path path
                        :_id (cat-id category)
                        :id (cat-id category)} ; separate id for frontend compatibility
                       metadata)]
    (assoc acc
      :index (inc (:index acc))
      :list (concat (:list acc)
                    [payload]
                    (:list (reduce parse-category
                                   {:index 0, :path-prefix (str path "."), :list []}
                                   (:children category)))))))

(defn extract-from-source
  "Parses the source category data into a flat structure including
  dewey decimal paths"
  [json-body]
  (:list (reduce parse-category
                          {:path-prefix root-path, :index 0, :list []}
                          [json-body])))


(defn index-categories!
  [es-conn index-name categories-url]
  (base/index! es-conn index-name "categories" categories-url
               base/get-with-auth
               (partial base/parse-json-from-http extract-from-source)
               base/bulk-to-es!))

