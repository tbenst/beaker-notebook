(ns bunsen.common.middleware.logger
  (:require [clansi.core :refer [style]]))

(defn wrap-logger [handler]
  (fn [req]
    (let [beg (System/nanoTime)
          uri (:uri req)
          verb (:request-method req)
          res (handler req)
          status (or (:status res) 404)
          end (str
                "[" (/ (- (System/nanoTime) beg) 1e9) "s]")]
      (println
        verb
        (style
          status
          (condp > status
            299 :green
            399 :blue
            499 :yellow
            :red))
        uri
        (style end :bright))
      res)))
