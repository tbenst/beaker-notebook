(ns bunsen.marketplace.config)

(defn config
  ":server-port e.g. 8444
   :elasticsearch-url, e.g. http://10.10.10.10:9200"
  [env]
  {:cookie-salt (:cookie-salt env)
   :allow-seed (:allow-seed env)
   :seed-file (:marketplace-seed-file env)
   :database-uri (:marketplace-database-uri env)
   :elasticsearch-url (format "http://%s:%s"
                              (:elasticsearch-host env)
                              (:elasticsearch-port env))
   :elasticsearch-options (let [user (:elasticsearch-user env)
                                pass (:elasticsearch-pass env)]
                            (if-not (and user pass)
                              {}
                              {:basic-auth [user pass]}))
   :kerberos?  (boolean (:kerberos-principal env))
   :kerberos-principal (:kerberos-principal env)
   :jetty-options (let [keystore (:ssl-keystore env)
                        keystore-pass (:ssl-keystore-pass env)]
                    (if-not (and keystore keystore-pass)
                      {:port (Integer. (:marketplace-port env))
                       :ssl? false
                       :join? false}
                      {:ssl? true
                       :port (+ (Integer. (:marketplace-port env)) 1)
                       :ssl-port (Integer. (:marketplace-port env))
                       :keystore (:ssl-keystore env)
                       :key-password (:ssl-keystore-pass env)
                       :join? false}))})
