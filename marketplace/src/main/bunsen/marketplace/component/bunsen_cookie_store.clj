(ns bunsen.marketplace.component.bunsen-cookie-store
  (:require [bunsen.marketplace.helper.cookie.util :as cookie]
            [clojure.data.json :as json])
  (:use ring.middleware.session.store))

(deftype BunsenCookieStore [secret-key]
  SessionStore
  (read-session [f data]
    (if-let [unsigned (cookie/unsign data secret-key)]
      (json/read-str (subs unsigned 2) :key-fn keyword)
      {}))

  (write-session [_ key data] (println "write session not implemented"))
  (delete-session [_ key] (println "delete session not implemented")))

(defn bunsen-cookie-store
  ([] (bunsen-cookie-store ""))
  ([secret-key]
    (BunsenCookieStore. (or secret-key ""))))

