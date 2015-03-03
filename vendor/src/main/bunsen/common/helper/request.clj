(ns bunsen.common.helper.request
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

(def default-options {:throw-exceptions false
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
    (post "/api/seed/drop-all") (f)))

(defn seed [data]
  (post "/api/seed/data"
        {:body (json/write-str data)
         :content-type :json}))

(def researcher-role 0)

(def admin-role 1)

(def seed-emails {researcher-role "research@mojotech.com"
                  admin-role "admin@mojotech.com"
                  })

(defn sign-in
  ([] (sign-in 0))
  ([role]
   (let [cookie (cookies/cookie-store)
         email (get seed-emails role)]
     (post "/api/seed/sign-up" {:form-params {:data {:name "Bob Jones"
                                                     :email (str email)
                                                     :password "bob1234"
                                                     :role role
                                                     }}
                                :cookie-store cookie
                                })
     cookie)))
