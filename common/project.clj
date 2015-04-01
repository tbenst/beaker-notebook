(defproject bunsen/common "0.1.0-SNAPSHOT"
  :description "Bunsen common module."
  :test-paths ["src/test"]
  :source-paths ["src/main"]
  :dependencies [[org.clojure/clojure _]
                 [org.clojure/data.codec "0.1.0"]
                 [pandect "0.5.1"]
                 [wkf/clj-http _]
                 [org.clojure/data.json _]]
  :plugins [[lein-modules "0.3.10"]])
