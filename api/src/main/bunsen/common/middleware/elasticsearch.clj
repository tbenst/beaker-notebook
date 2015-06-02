(ns bunsen.common.middleware.elasticsearch)

(defn wrap-elasticsearch [handler _ elasticsearch]
  (fn [req]
    (handler (assoc req
                    :elasticsearch elasticsearch
                    :elasticsearch-conn (:conn elasticsearch)
                    :es (:conn elasticsearch)))))
