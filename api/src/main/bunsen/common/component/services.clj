(ns bunsen.common.component.services
  "A meta component to combines handlers from multiple services."
  (:require [com.stuartsierra.component :as component]))

(defrecord Services []
  component/Lifecycle

  (component/start [services]
    (if (:handler services)
      services
      (assoc
        services :handler (let [handlers (->> services vals (map :handler))]
                            (fn [req]
                              (first
                                (keep #(% req) handlers)))))))

  (component/stop [services]
    (dissoc services :handler)))

(defn services [] (->Services))
