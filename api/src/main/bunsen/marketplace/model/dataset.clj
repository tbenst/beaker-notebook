(ns bunsen.marketplace.model.dataset
  (:require [clojurewerkz.elastisch.rest.index :as ind]
            [clojurewerkz.elastisch.rest.document :as doc]
            [bunsen.common.helper.elasticsearch :as es]))

(defn- metadata-indexes
  [metadata type]
  (keys (filter #(= (-> % second :indexes first) type) metadata)))

(defn- category-path-filter
  [cat-path]
  {:bool {:should [{:term {:categories.path cat-path}} {:prefix {:categories.path (str cat-path ".")}}]}})

(defn- filter-terms
  [k v]
  {:terms {:execution "and" (keyword k) v}})

(defn- filter-term
  [k v]
  {:term {(keyword k) v}})

(defn- must-filters
  [fields params]
  (let [filters [(category-path-filter (or (:category-path params) "0"))]
        fields-in-params (into {} (map #(when ((keyword %) params)
                                          {(keyword %) ((keyword %) params)})
                                       fields))]
    (vec (concat filters
                 (map (fn [[k v]] (if (vector? v)
                                    (filter-terms k v)
                                    (filter-term k v)))
                      fields-in-params)))))

(defn- aggregators
  [fields]
  (apply merge (map #(hash-map % {:terms {:field %}}) fields)))

(defn- must-queries
  [text-fields query]
  (map (fn [query] {:multi_match {:query (val query)
                                  :type "phrase_prefix"
                                  :fields text-fields
                                  :operator "and"}})
       (select-keys query [:searchTerm :searchScope])))

(defn- must-not-filters
  [params]
  (if (:exclude params)
    [{:ids {:values [(:exclude params)]}}]
    []))

(defn- query-builder
  [catalog params]
  {:filtered {:query {:bool {:must (must-queries (metadata-indexes (:metadata catalog) "text") params)}}
              :filter {:bool {:must (must-filters (metadata-indexes (:metadata catalog) "filter") params)
                              :must_not (must-not-filters params)}}}})

(defn- transform-results
  [{:keys [hits]}]
  {:data
   (->> (:hits hits)
        (mapv #(assoc (:_source %) :index (:_index %))))
   :filters {}
   :total-items (:total hits)})

(defn update-dataset-mappings!
  [es-conn index-name categories]
  (let [metadata (apply merge (keep :metadata categories))]
   (->> {:datasets
        {:properties
         (zipmap (metadata-indexes metadata "filter")
                 (repeat {:type "string"
                          :index "not_analyzed"}))}}
       (ind/update-mapping es-conn index-name "datasets" :mapping))))

(defn generate-filters
  [catalog-filters aggregations]
  (apply merge (map (fn [catalog-filter]
                      (hash-map catalog-filter
                                (map #(:key %)
                                     (:buckets (catalog-filter aggregations)))))
                    catalog-filters)))

(defn find-datasets
  [es-conn index-name query catalog]
  (let [category-path (:category-path query)
        catalog-filters (metadata-indexes (:metadata catalog) "filter")
        results (doc/search es-conn
                            index-name
                            "datasets"
                            :size (:size query)
                            :from (:from query)
                            :query (query-builder catalog query)
                            :sort [{:_score {:order "desc"}} {:raw_title {:order "asc"}}]
                            :aggs (aggregators catalog-filters))
        aggregations (:aggregations results)
        filters (generate-filters catalog-filters aggregations)]
    (assoc (transform-results results) :filters filters)))

(defn find-datasets-by-ids
  [es-conn dataset-ids]
  (let [query {:ids {:values dataset-ids}}
        results (doc/search es-conn
                            "*"
                            "datasets"
                            :size 10
                            :query query)]
    (transform-results results)))

(defn create-dataset!
  "Creates a single dataset based on the index-name provided"
  [es-conn index-name dataset]
  (let [created-id (:_id (doc/create es-conn index-name "datasets" dataset))]
    ; set the ID attribute of a dataset to be the internal elastic search _id
    ; since the api consumers expect their to be an ID attribute on each dataset.
    (doc/update-with-partial-doc es-conn index-name "datasets" created-id {:id created-id})))

(defn count-datasets-by-category
  [es-conn index-name category catalog]
  ;; TODO: implement function that counts without returning data
  (-> (find-datasets
        es-conn index-name
        {:from 0
         :limit 9999
         :category-path (:path category)}
        catalog)
      :total-items))

(defn get-dataset
  [es-conn index-name dataset-id]
  (-> (doc/get es-conn index-name "datasets" dataset-id)
      :_source))

(defn- prepare-dataset
  [dataset categories]
  (let [categories-by-id (zipmap (map :id categories) categories)]
    (merge
      dataset
      {:id (:id dataset)
       :_id (:id dataset) ; required for elastisch api
       :title (:title dataset)
       :categories
       (->> (:categoryIds dataset)
            (map #(get categories-by-id %))
            (map #(select-keys % [:id :name :path])))})))

(defn create-datasets!
  "Returns true if datasets payload was succesfully sent to elasticsearch, false otherwise."
  [es-conn index-name datasets categories]
  (let [indexer (es/index! es-conn index-name "datasets" datasets
                           identity ; json already parsed
                           (partial map #(prepare-dataset % categories))
                           es/bulk-to-es!)]
    (await-for 5000 indexer)
    (= (:stage @indexer) :indexed)))

(defn retract-dataset!
  [es-conn index-name dataset-id]
  (doc/delete es-conn index-name "datasets" dataset-id))

(defn update-dataset!
  "Updates dataset with given payload"
  [es-conn index-name dataset-id dataset]
  (doc/put es-conn index-name "datasets" dataset-id dataset))
