(defproject bunsen/publications "0.1.0-SNAPSHOT"
  :description "bunsen publications service"
  :url "https://github.com/twosigma/bunsen"
  :main bunsen.publications.service
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/tools.cli "0.3.1"]
                 [org.clojure/data.codec "0.1.0"]
                 [com.stuartsierra/component "0.2.2"]
                 [com.datomic/datomic-free "0.9.5130"]
                 [ring "1.3.1"]
                 [bidi "1.10.4"]
                 [liberator "0.12.1"]
                 [ring/ring-json "0.3.1"]
                 [io.rkn/conformity "0.3.3"]
                 [environ "1.0.0"]]
  :plugins [[lein-environ "1.0.0"]]
  :test-paths ["src/test"]
  :source-paths ["src/main"]
  :profiles {:uberjar {:aot [bunsen.publications.service]}
             :dev {:env {
                         :server-port 3003
                         :database-uri "datomic:mem://publications"}
                   :repl-options {:init (user/watch)}
                   :source-paths ["src/dev"]
                   :dependencies [[hawk "0.1.1"]
                                  [ring-mock "0.1.5"]
                                  [org.clojure/tools.namespace "0.2.7"]]}}
  :aliases {"build" ["do" ["clean"] ["uberjar"]]})
