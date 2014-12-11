(ns bunsen.provisioner.helper.marathon
  (:require [bunsen.provisioner.helper.rest :as rest]))

(declare wait-for)

(defn get-app [host id]
  (rest/get host (str "v2/apps" id)))

(defn create-app [host app]
  (rest/post host "v2/apps" {:form-params app})
  (wait-for
    #(->
       (get-app host (get app "id"))
       (get-in ["app" "deployments"])
       empty?)
    :timeout 120))

(defn update-app [host id app]
  (rest/put host (str "v2/apps" id) {:form-params app}))

(defn create-or-update-app [host id app]
  (if-let [app* (get-app host id)]
    (if (= app app*)
      app
      (update-app host id app))
    (create-app host app)))

(defn app [{:keys [id config template]}]
  (merge-with merge template (assoc config "id" id)))

; http://mikerowecode.com/2013/02/clojure-polling-function.html
(defn wait-for
  "Invoke predicate every interval (default 2) seconds until it returns true,
  or timeout when (default 10) seconds have elapsed.

  Returns nil if the timeout elapses before the predicate becomes true, otherwise
  the value of the predicate on its last evaluation."
  [predicate & {:keys [interval timeout]
                :or {interval 2
                     timeout 10}}]
  (let [end-time (+ (System/currentTimeMillis) (* timeout 1000))]
    (loop []
      (if-let [result (predicate)]
        result
        (do
          (Thread/sleep (* interval 1000))
          (if (< (System/currentTimeMillis) end-time)
            (recur)))))))
