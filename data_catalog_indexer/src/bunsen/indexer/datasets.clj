(ns bunsen.indexer.datasets
  (:require [bunsen.indexer.base :as base]
            [clj-http.client :as http]
            ))

(defn extract-datasets
  "Given a feed result page json, extracts the datasets.  Althugh this consists of
   a single symbol function call, leaving it because there have been other layouts
  proposed for the structre of the json document"
  [json-body]
  (:pageContent json-body))

(defn es-dataset-doc
  "Given one dataset from the feed, and the collection of categories, returns the Elastiche payload for the category"
  [categories dataset]
  (let [id (read-string (:id dataset))
        cat-id (dataset :categoryId)
        source-category (categories (str cat-id))]
    {:_id id
     :id id
     :title (:product dataset)
     :vendor (:vendor dataset)
     :categories [{:id cat-id
                   :name (:name source-category)
                   :path (:path source-category)}]
     :lastUpdated (:activeAgo dataset)
     :metaDataChanged (:lastUpdateTime dataset)
     :remoteFile (:storage dataset)
     :createdAt (:firstUpdateTime dataset)
     :description (:description dataset)
     :businessOwner (:businessOwner dataset)
     :public (:public dataset)}))

(defn parse-feed-page
  "Given the raw response from TS feed, parses it"
  [categories json-body]
  {:more (:more json-body)
   :datasets (map (partial es-dataset-doc categories)
                  (extract-datasets json-body))})

(defn source-page-url
  "Constructs the full url for a source dataset page from base and params"
  [base page-number since]
  (str base "&page=" page-number "&since=" since))

(defn bulk-index!
  ""
  [es-conn index-name mapping-type {:keys [more datasets] :as result}]
  {:index-response (base/bulk-to-es! es-conn index-name mapping-type datasets)
   :more more})

(defn index-datasets!
  "Given an elasticsearch connection, base url category map and index name, index all datasets"
  [es-conn index-name base-url categories]
  (loop [page-number 0]
    (let [page-url (source-page-url base-url page-number 0)
          indexer (base/index! es-conn index-name "datasets" page-url
                               base/get-with-auth
                               (partial base/parse-json-from-http
                                        (partial parse-feed-page categories))
                               bulk-index!)]
      (await-for 5000 indexer)
      (if (-> @indexer :result :more)
        (recur (+ page-number 1))
        indexer))))
