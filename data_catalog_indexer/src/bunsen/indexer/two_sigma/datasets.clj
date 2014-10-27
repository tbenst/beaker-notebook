(ns bunsen.indexer.two-sigma.datasets
  (:require [bunsen.indexer.base :as base]
            [bunsen.indexer.datasets :as sets]
            [clj-http.client :as http]
            ))


(defn source-page-url
  "Constructs the full url for a source dataset page from base and params"
  [base page-number since]
  (str base (http/generate-query-string
             {"page" page-number "since" since})))

(defn bulk-index!
  [es-conn index-name mapping-type {:keys [more datasets] :as result}]
  {:index-response (base/bulk-to-es! es-conn index-name mapping-type datasets)
   :more more})

(defn extract-datasets
  "Given a feed result page json, extracts the datasets.  Althugh this consists of
   a single symbol function call, leaving it because there have been other layouts
  proposed for the structre of the json document"
  [json-body]
  (:pageContent json-body))

(defn prepare-dataset
  "Given one dataset from the feed, and the collection of pre-indexed categories,
  returns the canonical representation of the datasets"
  [categories dataset]
  (sets/indexable-dataset
   (. Integer parseInt (:id dataset))
   (:product dataset)
   [(:categoryId dataset)]
   categories
   {:vendor (:vendor dataset)
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
   :datasets (map (partial prepare-dataset categories)
                  (extract-datasets json-body))})


(defn index-datasets!
  "Given an elasticsearch connection, base url category map and index name,
  index all datasets"
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
