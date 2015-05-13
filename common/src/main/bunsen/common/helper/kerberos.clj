(ns bunsen.common.helper.kerberos
  (:use ring.util.response)
  (:require [ring.util.response :refer [response]]
            [clojure.data.codec.base64 :as b64])
  (:import org.ietf.jgss.GSSManager)
  (:import org.ietf.jgss.GSSCredential)
  (:import org.ietf.jgss.Oid)
  (:use [clojure.string :exclude (reverse replace)]))

(def krb5Mech (Oid. "1.2.840.113554.1.2.2"))
(def krb5PrincNameType (Oid. "1.2.840.113554.1.2.2.1"))
(def spnegoMech (Oid. "1.3.6.1.5.5.2"))

(defn decode-input-token
  "Find the token in the authorization header, then decode it with  base64"
  [req]
  (let [enc-tok (get-in req [:headers "authorization"])
        tfields (split  enc-tok #" ")]
    (when (= "negotiate" (lower-case (first tfields)))
      (b64/decode (.getBytes (last tfields))))))

(defn encode-output-token
  "Take a token from a gss accept context call and encode it for use in a -authenticate header"
  [token]
  (str "Negotiate " (String. (b64/encode token))))
 

(defn do-gss-auth-check [gss_context req]
  (when-let [intok (decode-input-token req)]
    (when-let [ntok (.acceptSecContext gss_context intok 0 (alength intok))]
      (encode-output-token ntok))))

(defn response-401-negotiate
  "Tell the client you'd like them to use kerberos"
  []
  (-> "Unauthorized"
       response
      (status 401)
      (header "Content-Type" "text/html")
      (header "WWW-Authenticate" "Negotiate")))

(defn gss-context-init
  "Initialize a new gss context with name 'svc_name'"
  [svc_name]
  (let [manager (GSSManager/getInstance)
        service_name (.createName manager svc_name krb5PrincNameType)
        creds (.createCredential manager GSSCredential/ACCEPT_ONLY)
        gss (.createContext manager creds)]
    gss))

(defn gss-get-princ [gss]
  (.toString (.getSrcName gss)))

(defn authenticate [app svc & {:keys [require? log-exceptions?]
                               :or {require? true
                                    log-exceptions? true}}]
  (fn [req]
    (if (nil? svc)
      (app req)
      (if (get-in req [:headers "authorization"])
        (let [gss_context (gss-context-init svc)]
          (if-let [token (do-gss-auth-check gss_context req)]
            (-> (app (merge req {:remote-user (str (.getSrcName gss_context))})) (header "WWW-Authenticate" token))
	      (response-401-negotiate)))
	    (response-401-negotiate)))))

