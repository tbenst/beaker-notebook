(ns bunsen.provisioner.helper.cli
  (:require [clojure.tools.cli :refer [parse-opts]]))

(defn print-summary [x]
  (println "Usage: bunsen-provisioner [options]\n")
  (println (:summary x))
  (flush))

(defn print-errors [x]
  (print-summary x)
  (println "")
  (doall
    (map println (:errors x)))
  (flush))

(def options
  [["-p" "--port PORT" "Port number"
    :default 3001
    :parse-fn #(Integer/parseInt %)
    :validate [#(< 0 % 0x10000) "Must be a number between 0 and 65536"]]
   ["-h" "--help"]])

(defn parse-args [args]
  (let [parsed (parse-opts args options)]
    (cond
      (-> parsed :options :help) (print-summary parsed)
      (-> parsed :errors not-empty) (print-errors parsed)
      :else (:options parsed))))
