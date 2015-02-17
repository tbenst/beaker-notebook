(ns bunsen.indexer.pipeline)

(defn pipeline
  "Given an agent and a collection of stages (stagename, worker function),
  sends-off the worker function of each stages in order.  At each stage,
  passes the return value of the previous to the worker function.  Keeps the
  :stage key of the agent up-to-date with last executed stage."
  [agent steps]
  (doseq [[stage work] steps]
    (send-off agent (fn [ctx]
                      (assoc ctx :stage stage :result (work (:result ctx)))
                      )))
  agent)
