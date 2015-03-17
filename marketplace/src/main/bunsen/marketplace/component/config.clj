(ns bunsen.marketplace.component.config)

(defn config
  ":server-port e.g. 8444
   :elasticsearch-url, e.g. http://10.10.10.10:9200"
  [env]
  {:server-port (Integer. (:marketplace-port env))
   :cookie-salt (:cookie-salt env)
   :allow-seed (:allow-seed env)
   :elasticsearch-url (format "http://%s:%s"
                              (:elasticsearch-host env)
                              (:elasticsearch-port env))
   :elasticsearch-options (let [user (:elasticsearch-user env)
                                pass (:elasticsearch-pass env)]
                            (if-not (and user pass)
                              {}
                              {:basic-auth [user pass]}))})
