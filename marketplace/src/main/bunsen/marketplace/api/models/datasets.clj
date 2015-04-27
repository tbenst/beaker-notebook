(ns bunsen.marketplace.api.models.datasets
  (:require [bunsen.marketplace.helper.api :as helper]
            [clojurewerkz.elastisch.rest.document :as doc]
            [clojure.string :as str]))

(defn get-catalog
  [es-conn index-name path]
  (let [catalog (doc/search es-conn
                            index-name
                            "categories"
                            :query {:term {:path path}})]
    (-> catalog :hits :hits first :_source)))

(defn extract-catalog-path [category-path]
  (if (nil? category-path) "0.1"
    (->> (str/split category-path #"\.") (take 2) (interpose ".") str/join)))

(defn dataset-catalog-path
  [dataset]
  (let [category (-> dataset :categories first)]
    (extract-catalog-path (:path category))))

(defn metadata-indexes
  [metadata type]
  (keys (filter #(= (-> % second :indexes first) type) metadata)))

(defn category-path-filter
  [cat-path]
  {:bool {:should [{:term {:categories.path cat-path}} {:prefix {:categories.path (str cat-path ".")}}]}})

(defn filter-terms
  [k v]
  {:terms {:execution "and" (keyword k) v}})

(defn filter-term
  [k v]
  {:term {(keyword k) v}})

(defn must-filters
  [fields params]
  (let [filters [(category-path-filter (or (:category-path params) "0"))]
        fields-in-params (into {} (map #(when ((keyword %) params)
                                                     {(keyword %) ((keyword %) params)})
                                       fields))]
    (conj filters (reduce-kv (fn [m k v ] (if (vector? v)
                                            (conj m (filter-terms k v))
                                            (conj m (filter-term k v))))
                             {}
                             fields-in-params))))

(defn must-not-filters
  [params]
  (if (:exclude params)
    [{:ids {:values [(:exclude params)]}}]
    []))

(defn query-builder
  [catalog params]
  {:filtered {
    ;TODO implement query filter
    ;:query {
    ;  :bool {:must (build-must-queries catalog-text-fields query)}}
    :filter {
      :bool {
        :must (must-filters (metadata-indexes (:metadata catalog) "filter") params)
        :must_not (must-not-filters params)}}}})

(defn transform-results
  [results]
  (into [] (map #(merge (:_source %) {:index (:_index %)}) (-> results :hits :hits))))

(defn find-matching
  [es-conn query]
  (let [category-path (:category-path query)
        catalog-path (extract-catalog-path category-path)
        index (:index query)
        catalog (get-catalog es-conn index catalog-path)
        results (doc/search es-conn
                            index
                            "datasets"
                            :size (:size query)
                            :from (:from query)
                            :query (query-builder catalog query)
                            :sort [{:_score {:order "desc"}} {:raw_title {:order "asc"}}])]
    (transform-results results)))

(defn get-dataset
  [config index-name id]
  (let [es-conn (helper/connect-to-es config)
        dataset (-> es-conn (doc/get index-name "datasets" id) :_source)
        catalog-path (dataset-catalog-path dataset)]
    (assoc dataset :catalog (get-catalog es-conn index-name catalog-path)
                   :index index-name
                   :related (find-matching es-conn
                                           {:category-path catalog-path
                                            :tags (:tags dataset)
                                            :exclude id
                                            :index index-name
                                            :size 5
                                            :from 0}))))
