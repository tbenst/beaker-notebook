(defproject bunsen/marketplace "0.1.0-SNAPSHOT"
  :description "Manages the marketplace data for Bunsen."
  :main bunsen.marketplace.service
  :test-paths ["src/test"]
  :source-paths ["src/main"]
  :dependencies [[bunsen/common _]
                 [org.clojure/clojure _]
                 [org.clojure/data.json _]
                 [org.clojure/tools.cli "0.3.1"]
                 [org.clojure/data.codec "0.1.0"]
                 [com.stuartsierra/component _]
                 [ring _]
                 [ring/ring-json _]
                 [bidi _ :exclusions [org.clojure/clojure]]
                 [environ _]
                 [pandect "0.5.1"]
                 [liberator _]
                 [wkf/clj-http _]
                 [com.taoensso/timbre "3.3.1"]
                 [clojurewerkz/elastisch "2.1.0"]]
  :plugins [[lein-modules "0.3.10"]]
  :profiles {:uberjar {:aot [bunsen.marketplace.service]}
             :dev {:source-paths ["src/dev"]
                   :repl-options {:init (user/watch)
                                  :init-ns user}
                   :dependencies [[hawk "0.1.1"]
                                  [ring-mock "0.1.5"]
                                  [org.clojure/tools.namespace "0.2.10"]]}})
