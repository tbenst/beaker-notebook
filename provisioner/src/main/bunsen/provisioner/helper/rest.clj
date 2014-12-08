(ns bunsen.provisioner.helper.rest
  (:refer-clojure :exclude [get])
  (:require [clojure.string :as str]
            [clj-http.client :as http]
            [cemerick.url :refer [url]]))

(defn request
  ([method host path]
   (request method host path {}))
  ([method host path options]
   (-> (method
         (str  (url host path))
         (merge
           {:as :json-string-keys
            :accept :json
            :content-type :json}
           options))
       :body)))

(def get
  (partial request http/get))

(def post
  (partial request http/post))

(def put
  (partial request http/put))

(def delete
  (partial request http/delete))
