(ns bunsen.indexer.base
  (:require [bunsen.indexer.pipeline :as pipe]
            [clj-http.client :as http]
            [clojure.data.json :as json]
            [clojure.java.io :as io]
            [clojurewerkz.elastisch.rest.bulk :as bulk]
            [clojurewerkz.elastisch.rest.document :as doc]
            [clojurewerkz.elastisch.rest.response :as res]
            [taoensso.timbre :as log]
            ))

(defn json-resource
  [path]
  (json/read-str (-> path io/resource io/file slurp) :key-fn keyword))

(defn get-with-auth
  [url]
  (http/get url (when (System/getenv "USE_KERBEROS") {:spnego-auth true})))

(defn read-indexed-results
  "Given params to specify an ES mapping, reads the entire contents into memory"
  [es-conn index-name mapping-name]
  (let [es-response (doc/search es-conn index-name mapping-name :size 9999)]
    (into {} (map (juxt :_id :_source) (res/hits-from es-response)))
    ))

(defn bulk-to-es!
  "Indexes the parsed data feed in ElasticSearch"
  [es-conn index-name mapping-type payload]
  (bulk/bulk-with-index-and-type es-conn index-name mapping-type
                                 (bulk/bulk-index payload)))

(defn parse-json-from-http
  "Given an http response, check it for errors and status code. If successful,
  return the result of parse-body-fn on the body.  Otherwise, raise ex-info."
  [parse-body-fn response]
  (let [{:keys [status body error]} response]
    (when (or error (not= status 200))
      (throw (ex-info "failed http request" response)))
    (parse-body-fn (json/read-str body :key-fn keyword))))

(defn watch-log
  [agent description]
  (add-watch agent :log (fn [key ref old-ctx new-ctx]
                          (log/info "agent" description (hash ref)
                                    "value change" new-ctx))))

(defn index!
  "Implements a pipeline which downloads and parses a data feed,
  and indexes the result in ElasticSearch.  Caller must provide the functions
  to download, parse, and index.  NOTE:  parse-fn must return a vector like
  [:result __payload__ ...]"
  [es-conn index-name mapping-type src-url download-fn parse-fn index-fn]
  (let [a (agent {:stage "new" :result src-url})]
    (watch-log a (str "indexer for " src-url))
    (pipe/pipeline a {:source-downloaded download-fn
                      :payload-assembled parse-fn
                      :indexed (partial index-fn es-conn index-name mapping-type)})))

