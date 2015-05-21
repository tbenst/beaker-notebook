(defproject bunsen/marketplace "0.1.0-SNAPSHOT"
  :description "Manages the marketplace data for Bunsen."
  :main bunsen.marketplace.service
  :test-paths ["src/test"]
  :source-paths ["src/main"]
  :repositories {"my.datomic.com"
                 {:url "https://my.datomic.com/repo"
                  :username "will@mojotech.com"
                  :password "9b571a50-cb08-48ba-bd2c-86ccf58b1ad2"}}
  :dependencies [[bunsen/common _]
                 [org.clojure/clojure _]
                 [org.clojure/data.json _]
                 [org.clojure/tools.cli "0.3.1"]
                 [com.stuartsierra/component _]
                 [ring _]
                 [ring/ring-json _]
                 [bidi _ :exclusions [org.clojure/clojure]]
                 [environ _]
                 [liberator _]
                 [wkf/clj-http _]
                 [com.taoensso/timbre "3.3.1"]
                 [com.datomic/datomic-pro "0.9.5153" :exclusions [joda-time]]
                 [com.datastax.cassandra/cassandra-driver-core "2.0.6"]
                 [clojurewerkz/elastisch "2.1.0"]]
  :plugins [[lein-modules "0.3.10"]]
  :profiles {:uberjar {:aot [bunsen.marketplace.service]}
             :dev {:source-paths ["src/dev"]
                   :repl-options {:init (user/watch-marketplace)
                                  :init-ns user}
                   :jvm-opts ["-Xmx300m" "-Ddatomic.objectCacheMax=64m" "-Ddatomic.memoryIndexMax=128m" ]
                   :dependencies [[hawk _]
                                  [ring-mock "0.1.5"]
                                  [org.clojure/tools.namespace "0.2.10"]]}})
