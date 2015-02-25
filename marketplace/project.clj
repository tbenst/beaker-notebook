(defproject marketplace "0.1.0-SNAPSHOT"
  :description "Manages the Marketplace data for Bunsen."
  :url "https://github.com/twosigma/bunsen"
  :jvm-opts ["-Dsun.security.jgss.native=true" "-Xmx256M"]
  :main bunsen.marketplace.service
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/tools.cli "0.3.1"]
                 [com.stuartsierra/component "0.2.2"]
                 [ring "1.3.2"]
                 [bidi "1.15.0" :exclusions [org.clojure/clojure]]
                 [liberator "0.12.2"]
                 [org.clojure/data.json "0.2.5"]
                 [com.taoensso/timbre "3.3.1"]
                 [clojurewerkz/elastisch "2.1.0"]
                 [wkf/clj-http "1.0.1-SNAPSHOT-MOJO"]
                 [ring/ring-json "0.3.1"]
                 [environ "1.0.0"]]
  :plugins [[lein-environ "1.0.0"]]
  :source-paths ["src/main"]
  :test-paths ["src/test"]
  :resource-paths ["resources"]
  :profiles {:uberjar {:aot [bunsen.marketplace.service]}
             :dev {:env {:marketplace-port 8444
                         :elasticsearch-host "localhost"
                         :elasticsearch-port 9200}
                   :repl-options {:init (user/watch)}
                   :source-paths ["src/dev"]
                   :dependencies [[hawk "0.1.1"]
                                  [ring-mock "0.1.5"]
                                  [org.clojure/tools.namespace "0.2.7"]]}
             :test {:env {:server-port 6444}}}
  :aliases {"build" ["do" ["clean"] ["uberjar"]]})
