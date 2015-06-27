(ns bunsen.marketplace.model.category
  (:require [clojure.string :as str]
            [datomic.api :as d]
            [bunsen.common.helper.utils :as u]
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

(defn find-category
  [datomic-db category-id]
  (d/q '[:find (pull ?c [* {:marketplace.category/parent [:marketplace.category/public-id]}
                           {:marketplace.category/catalog [:catalog/public-id]}]) .
         :in $ ?cid
         :where [?c :marketplace.category/public-id ?cid]]
       datomic-db  (u/uuid-from-str category-id)))

(defn create-category!
  [conn params]
  (let [parent-category (when (:parent-id params) (find-category (d/db conn) (:parent-id params)))
        c {:db/id (d/tempid :db.part/user)
           :marketplace.category/public-id (d/squuid)
           :marketplace.category/name (:name params)
           :marketplace.category/parent parent-category
           :marketplace.category/catalog (:catalog params)
           :marketplace.category/contact-name (:contact-name params)
           :marketplace.category/contact-email (:contact-email params)
           :marketplace.category/description (:description params)}]
    @(d/transact conn [(u/remove-nils c)])
    (dissoc c :db/id)))

(defn update-category!
  [conn params]
  (when-let [c (find-category (d/db conn) (:category-id params))]
    (let [tx (-> params
                 (dissoc :category-id)
                 (u/remove-nils)
                 (u/namespace-keys "marketplace.category")
                 (assoc :db/id (:db/id c)))]
      @(d/transact conn [tx])
      (-> (find-category (d/db conn) (:category-id params))
          (dissoc :db/id)))))

(defn delete-category!
  [conn category-id]
  (when-let [c (find-category (d/db conn) category-id)]
    @(d/transact conn [[:db.fn/retractEntity (:db/id c)]])))

(defn- get-children-categories
  [datomic-db parent-cat-id]
  (d/q '[:find [(pull ?c [* {:marketplace.category/parent [:marketplace.category/public-id]}
                            {:marketplace.category/catalog [:catalog/public-id]}]) ...]
         :in $ ?pid
         :where [?eid :marketplace.category/public-id ?pid]
                [?c :marketplace.category/parent ?eid]]
       datomic-db (u/uuid-from-str parent-cat-id)))

(defn- base-categories
  [datomic-db]
  (d/q '[:find [(pull ?c [* {:marketplace.category/parent [:marketplace.category/public-id]}
                            {:marketplace.category/catalog [:catalog/public-id]}]) ...]
         :in $
         :where [?c :marketplace.category/public-id]
                [(missing? $ ?c :marketplace.category/parent)]]
       datomic-db))

(defn- find-and-merge-children
  [datomic-db results pre]
  (merge results (flatten (mapv #(get-children-categories datomic-db (str (:marketplace.category/public-id %)))
                                pre))))

(defn- get-children-r
  [datomic-db categories loop-count]
  (loop [i loop-count results categories]
    (if (zero? i)
      (flatten results)
      (if (= i loop-count)
        (recur (dec i) (find-and-merge-children datomic-db results results))
        (recur (dec i) (find-and-merge-children datomic-db results (last results)))))))

(defn- assoc-dataset-count
  [es-conn categories]
  (mapv #(assoc % :count (-> (doc/search es-conn
                                         "*"
                                         "datasets"
                                         :query {:term {:categoryIds (str (:marketplace.category/public-id %))}})
                             :hits
                             :total))
        categories))

(defn search-categories
  [datomic-db query]
  (d/q '[:find [(pull ?c [*]) ...]
         :in $ ?cid ?search
         :where [?eid :catalog/public-id ?cid]
                [?c :marketplace.category/catalog ?eid]
                ;;FIXME: instead of using fulltext, just filter results by the search term after querying
                [(fulltext $ :marketplace.category/name ?search) [[?c]]]]
       datomic-db (u/uuid-from-str (:catalog-id query)) (:search-term query)))
