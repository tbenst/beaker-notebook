(ns bunsen.marketplace.model.category
  (:require [clojure.string :as str]
            [clojurewerkz.elastisch.rest.document :as doc]
            [bunsen.common.helper.elasticsearch :as es]))

(defn list-categories
  [es-conn index-name]
  (es/read-results es-conn index-name "categories"))

(defn update-category-count!
  [es-conn index-name category n]
  (doc/update-with-partial-doc
    es-conn index-name "categories" (str (:id category)) {:count n}))

(defn get-category
  "Fetches a single category within a given catalog and having a matching index"
  [es-conn index-name category-path]
  (-> (doc/search es-conn
                  index-name
                  "categories"
                  :size 1
                  :query {:term {:path category-path}})
      :hits :hits first :_source))

(defn- extract-catalog-path [category-path]
  (if (nil? category-path) "0.1"
    (->> (str/split category-path #"\.") (take 2) (interpose ".") str/join)))

(defn get-category-catalog
  [es-conn index-name category]
  (->> category
       :path
       extract-catalog-path
       (get-category es-conn index-name)))

(defn- build-query [params]
  (cond
    ; Typeahead
    (and (:index-name params) (:search-term params))
    {:multi_match {:query (:search-term params)
                   :fields ["name"]
                   :type "phrase_prefix"}}
    ; Category tree.
    (or (:root params) (:limit params))
    {:regexp {:path (format "%s(\\.[0-9]*){0,%s}" (or (:root params) 0) (or (:limit params) 0))}}
    ; Catch all
    :else
    {}))

(defn find-categories
  "Returns categories based on supplied parameters.

   Typeahead -
   index-name = index which category belongs to
   search-term = three or more characters which will search against category name

   Category Tree -
   root = root of category's path
   limit = limit length of path"
  [es-conn params]
  (let [query (build-query params)
        search (doc/search
                 es-conn
                 (or (:index-name params) "*")
                 "categories"
                 :size (or (:size params) 25)
                 :query query)]
    (map #(merge (:_source %) {:index (:_index %)})
         (-> search :hits :hits))))

(defn- prepare-category
  "Adds the _id element (copied from existing 'id') to each category"
  [category]
  (assoc category :_id (:id category)))

(defn create-categories!
  "Returns true if categories payload was succesfully sent to elasticsearch, false otherwise."
  [es-conn index-name categories]
  (let [indexer (es/index! es-conn index-name "categories" categories
                           identity ; json already parsed
                           (partial map prepare-category)
                           es/bulk-to-es!)]
    (await-for 5000 indexer)
    (= (:stage @indexer) :indexed)))
