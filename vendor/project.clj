(defproject tests "0.1.0-SNAPSHOT"
  :description ""
  :url ""
  :license {}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/data.json "0.2.5"]
                 [wkf/clj-http "1.0.1-SNAPSHOT-MOJO"]]
  :target-path "target/%s"
  :test-paths ["src/test"]
  :source-paths ["src/main"]
  :profiles {:uberjar {:aot :all}})
