(ns bunsen.common.helper.session.store
  (:require [clojure.data.json :as json]
            [clojure.string :as str]
            [pandect.algo.sha1 :refer [sha1]]
            [pandect.algo.sha256 :refer [sha256-hmac-bytes]]
            [clojure.data.codec.base64 :as b64])
  (:use ring.middleware.session.store))

(defn sign [to-sign secret]
  (str/replace
    (str to-sign "."
         (String. (b64/encode (sha256-hmac-bytes to-sign secret))))
    #"\=+$" ""))

(defn unsign [cookie-val secret]
  (if cookie-val
    (if (= "s:" (subs cookie-val 0 2))
      (let [stripped-signed (subs cookie-val 2)
            raw-val (subs stripped-signed 0 (.lastIndexOf stripped-signed "."))
            mac (sign raw-val secret)]
        (if (= (sha1 mac) (sha1 stripped-signed)) raw-val false))
      cookie-val)
    cookie-val))

(defn signed-session [data secret]
  (let [json-data (json/write-str data)
        unsigned (str "j:" json-data)]
    (str "s:" (sign unsigned secret))))

(deftype BunsenCookieStore [secret-key]
  SessionStore
  (read-session [f data]
    (if-let [unsigned (unsign data secret-key)]
      (json/read-str (subs unsigned 2) :key-fn keyword)
      {}))

  (write-session [_ _ data] (signed-session data secret-key))

  (delete-session [_ _] (signed-session {} secret-key)))

(defn bunsen-cookie-store
  ([] (bunsen-cookie-store ""))
  ([secret-key]
    (BunsenCookieStore. (or secret-key ""))))
