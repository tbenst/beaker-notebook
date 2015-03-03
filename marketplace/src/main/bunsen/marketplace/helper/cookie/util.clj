(ns bunsen.marketplace.helper.cookie.util
  (:require [pandect.algo.sha1 :refer [sha1]]
            [clojure.string :as str]
            [pandect.algo.sha256 :refer [sha256-hmac-bytes]]
            [clojure.data.codec.base64 :as b64]))

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
