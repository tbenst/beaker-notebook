(ns bunsen.marketplace.helper.pipeline
  (:require [taoensso.timbre :as log]))

(defn watch-log
  [agent description]
  (add-watch agent :log (fn [key ref old-ctx new-ctx]
                          (log/trace "agent" description (hash ref)
                                     "value change" new-ctx)))
  (set-error-handler! agent (fn [a ex]
                              (log/warn ex "agent" description))))
(defn pipeline
  "Given an agent and a collection of stages (stagename, worker function),
   sends-off the worker function of each stages in order.  At each stage,
   passes the return value of the previous to the worker function.  Keeps the
   :stage key of the agent up-to-date with last executed stage."
  ([agent steps] (pipeline agent "pipeline" steps))
  ([agent description steps]
   (watch-log agent description)
   (doseq [[stage work] steps]
     (send-off agent (fn [ctx]
                       (assoc ctx :stage stage :result (work (:result ctx))))))
   agent))
