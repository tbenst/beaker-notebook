(ns bunsen.marketplace.cli.seed.two-sigma
  (:require [clj-http.client :as http]
            [clojure.data.json :as json]
            [bunsen.common.helper.elasticsearch :as es]))

(def root-path "0.")

(defn metadata-for-root []
  (es/json-resource "two_sigma/category_metadata.json"))

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

(defn- get-with-auth
  [url]
  (http/get url (when (System/getenv "USE_KERBEROS") {:spnego-auth true})))

(defn- parse-json-from-http
  "Given an http response, check it for errors and status code. If successful,
   return the result of parse-body-fn on the body.  Otherwise, raise ex-info."
  [parse-body-fn response]
  (let [{:keys [status body error]} response]
    (when (or error (not= status 200))
      (throw (ex-info "failed http request" response)))
    (parse-body-fn (json/read-str body :key-fn keyword))))

(defn index-categories!
  [es-conn index-name categories-url]
  (es/index! es-conn index-name "categories" categories-url
             get-with-auth
             (partial parse-json-from-http extract-from-source)
             es/bulk-to-es!))

(defn source-page-url
  "Constructs the full url for a source dataset page from base and params"
  [base page-number since]
  (str base (http/generate-query-string
              {"page" page-number "since" since})))

(defn bulk-index!
  [es-conn index-name mapping-type {:keys [more datasets] :as result}]
  {:index-response (es/bulk-to-es! es-conn index-name mapping-type datasets)
   :more more})

(defn extract-datasets
  "Given a feed result page json, extracts the datasets.  Althugh this consists of
   a single symbol function call, leaving it because there have been other layouts
   proposed for the structre of the json document"
  [json-body]
  (:pageContent json-body))

;; FIXME: this is duplicated in both indexers
(defn indexable-dataset
  "Generate a dataset in canonical form, ready to passed as a call to index in
   Elastische.  cat-ids refers to a list of id's of categories, which are presumed
   to already exist in the indexed-categories param."
  [id title cat-ids indexed-categories extra-attrs]
  (let [cats (map #(select-keys (indexed-categories (str %1)) [:id :name :path])
                  cat-ids)]
    (merge extra-attrs
           {:_id id ; Required for Elastische API
            :id id
            :title title
            :categories cats})))

(defn prepare-dataset
  "Given one dataset from the feed, and the collection of pre-indexed categories,
   returns the canonical representation of the datasets"
  [categories dataset]
  (indexable-dataset
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
          indexer (es/index! es-conn index-name "datasets" page-url
                             get-with-auth
                             (partial parse-json-from-http
                                      (partial parse-feed-page categories))
                             bulk-index!)]
      (await-for 5000 indexer)
      (if (-> @indexer :result :more)
        (recur (+ page-number 1))
        indexer))))
