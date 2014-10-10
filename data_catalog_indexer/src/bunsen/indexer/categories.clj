(ns bunsen.indexer.categories
  (:require [bunsen.indexer.base :as base]
            [clj-http.client :as http]
            [clojurewerkz.elastisch.rest.document :as doc]
            [clojurewerkz.elastisch.rest.response :as res]
            [clojurewerkz.elastisch.query :as q]))

(def root-path "0.")

(defn metadata-for-root
  []
  (base/json-resource "category_metadata.json"))
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
  [:result (:list (reduce parse-category
                          {:path-prefix root-path, :index 0, :list []}
                          [json-body]))])

(defn index-categories!
  [es-conn index-name categories-url]
  (base/index! es-conn index-name "categories"
               (partial base/get-with-auth categories-url)
               (partial base/parse-json-from-http extract-from-source)
               base/bulk-to-es!))

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
  [:result (res/count-from response)])

(defn update-count!
  "Given a specific entity id in elastic search, update its count attribute
  in place"
  [id es-conn index-name mapping-type count]
  (doc/update-with-partial-doc es-conn index-name mapping-type id
                               {:doc {:count count}}))

(defn update-counts!
  "Given ES connection and category map, updates count attributes of
  all categories therein"
  [es-conn index-name categories]
  (doseq [category categories]
    (let [[id attrs] category]
      (await-for 5000
                 (base/index! es-conn index-name "categories"
                               (partial fetch-count es-conn index-name (:path attrs))
                               parse-count
                               (partial update-count! id))))))
