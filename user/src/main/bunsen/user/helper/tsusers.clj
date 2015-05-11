(ns bunsen.user.helper.tsusers
  (:require [clojure.string :as str]
            [cheshire.core :as chcore])
  (:import (org.apache.http.config RegistryBuilder)
           (org.apache.http.impl.auth SPNegoSchemeFactory)
           (org.apache.http.impl.client HttpClients)
           (org.apache.http.client.protocol HttpClientContext)
           (org.apache.http.impl.client BasicCredentialsProvider)
           (org.apache.http.client.config AuthSchemes)
           (org.apache.http.client.methods HttpGet)
           (org.apache.http.auth Credentials)
           (org.apache.http.auth AuthScope)
           (org.apache.commons.io IOUtils)
	   (javax.security.auth.kerberos KerberosPrincipal)))

(deftype KCredentials [ ]
  Credentials
  (getPassword [this] nil)
  (getUserPrincipal [this] nil))

(defn detect-charset  [content-type]
  (or
   (when-let [found (when content-type
                      (re-find #"(?i)charset\s*=\s*([^\s]+)" content-type))]
     (second found))
   "UTF-8"))

(defn coerce-json-body  [body charset]
  (let [^String charset (or charset "UTF-8")]
    (chcore/decode (String. ^"[B" body charset) true)))

(defn fetchdata [url]
  (let [builder (RegistryBuilder/create)
        spegofact (SPNegoSchemeFactory. true)
        b2 (.register builder (AuthSchemes/SPNEGO) spegofact)
        authSchemeRegistry (.build b2)
        client (.build (.setDefaultAuthSchemeRegistry (HttpClients/custom) authSchemeRegistry))
        context (HttpClientContext/create)
        credentialsProvider (BasicCredentialsProvider.)
        useJaasCreds (KCredentials.)
        authscope (AuthScope. nil -1 nil)
        httpget (HttpGet. url)]
    (.setCredentials credentialsProvider authscope useJaasCreds )
    (.setCredentialsProvider context credentialsProvider)
    (let [response (.execute client httpget context)
          content-type (try (.getValue (aget (.getHeaders response "Content-Type") 0)) (catch Exception e nil))
          charset (detect-charset content-type)
          body (IOUtils/toByteArray (.getContent (.getEntity response)))
	  jbody (coerce-json-body body charset)]
      jbody)))

(defn get-ext-user [account]
  (try
    (let [url (str "http://facebook.twosigma.com:8770/rest/userprofiles/user?username=" account)]
      (fetchdata url))
    (catch Exception e (println (str "exception: " e)))))


(defn merge-user [user extuser]
  (let [fields (get extuser :fields)
        name (get fields :person_name)
        email (get fields :person_email)]
    (assoc (dissoc user :user/name :user/email) :user/extdata fields :user/name name :user/email email)))
