(ns bunsen.common.middleware.with)

(defn wrap-with [handler & params]
  (fn [req]
    (handler (apply assoc req params))))
