(defproject bunsen/vendor "0.1.0-SNAPSHOT"
  :description "Manages Bunsen vendors."
  :test-paths ["src/test"]
  :source-paths ["src/main"]
  :dependencies [[bunsen/common _]
                 [org.clojure/clojure _]
                 [org.clojure/data.json _]
                 [wkf/clj-http _]]
  :plugins [[lein-modules "0.3.10"]]
  :profiles {:uberjar {:aot :all}})
