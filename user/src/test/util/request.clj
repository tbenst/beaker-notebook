(ns util.request
  (:require
    [clj-http.cookies :as cookies]
    [clojure.string :as str]
    [clojure.data.json :as json]
    [clj-http.client :as client]))

(def host-name (str "http://"
                    (or (System/getenv "API_HOST")
                        "127.0.0.1") ":"
                    (or (System/getenv "API_PORT")
                        "3000")))

(def default-options {
                      :throw-exceptions false
                      :cookie-store (cookies/cookie-store)})

(defn fetch
  ([route] (fetch {}))
  ([route opts]
   (client/get
     (str host-name route)
     (merge default-options opts))))

(defn delete
  ([route] (delete route {}))
  ([route opts]
   (client/delete
     (str host-name route)
     (merge default-options opts))))

(defn put
  ([route] (put route {}))
  ([route opts]
   (client/put
     (str host-name route)
     (merge default-options opts))))

(defn post
  ([route] (post route {}))
  ([route opts]
   (client/post
     (str host-name route)
     (merge default-options opts))))

(defn drop-all
  ([] (drop-all (constantly nil)))
  ([f]
    (post "/api/seed/drop-all")
    (f)))

(defn seed [data]
  (post "/api/seed/data"
        {:body (json/write-str data)
         :content-type :json}))

(defn sign-in []
  (let [cookie (cookies/cookie-store)]
    (post "/api/seed/sign-up" {
                               :form-params {
                                             :name "Bob Jones"
                                             :email "bob@bob.com"
                                             :password "bob1234"
                                             }
                               :cookie-store cookie
                               })
    cookie))
