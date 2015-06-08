(defproject bunsen "0.1.0-SNAPSHOT"
  :description "Big data for fun and profit."
  :url "https://github.com/twosigma/bunsen"
  :scm {:name "git"
        :url "https://github.com/twosigma/bunsen"}
  :test-paths ["src/test"]
  :source-paths ["src/main"]
  :main ^:skip-aot bunsen.main
  :repositories {"my.datomic.com"
                 {:url "https://my.datomic.com/repo"
                  :username "will@mojotech.com"
                  :password "9b571a50-cb08-48ba-bd2c-86ccf58b1ad2"}}
  :jvm-opts ["-Dsun.security.jgss.native=true"]
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/tools.cli "0.3.1"]
                 [org.clojure/data.json "0.2.5"]
                 [org.clojure/data.codec "0.1.0"]
                 [org.clojure/algo.generic "0.1.2"]
                 [com.stuartsierra/component "0.2.2"]
                 [com.datomic/datomic-pro "0.9.5153" :exclusions [joda-time]]
                 [com.datastax.cassandra/cassandra-driver-core "2.0.6"]
                 [org.apache.httpcomponents/httpcore "4.3.2"]
                 [org.apache.httpcomponents/httpclient "4.3.2"]
                 [org.apache.httpcomponents/httpmime "4.3.2"]
                 [org.elasticsearch/elasticsearch "1.3.4"]
                 [com.cemerick/url "0.1.1"]
                 [com.taoensso/timbre "3.3.1"]
                 [commons-io "2.4"]
                 [commons-codec "1.10"]
                 [crypto-random "1.2.0"]
                 [crypto-password "0.1.3"]
                 [ring "1.3.1"]
                 [ring/ring-json "0.3.1"]
                 [bidi "1.18.9" :exclusions [org.clojure/clojure]]
                 [bouncer "0.3.2"]
                 [environ "1.0.0"]
                 [liberator "0.13"]
                 [wkf/clj-http "1.0.1-SNAPSHOT-MOJO"]
                 [pandect "0.5.1"]
                 [clj-time "0.9.0"]
                 [myguidingstar/clansi "1.3.0"]
                 [io.rkn/conformity "0.3.3"]
                 [clojurewerkz/elastisch "2.1.0"]
                 [docker-client "0.1.4"]
                 [marathon-client "0.1.2"]]
  :profiles {:uberjar {:aot [bunsen.main]}
             :dev {:source-paths ["src/dev"]
                   :jvm-opts ["-Xmx300m"
                              "-Ddatomic.objectCacheMax=64m"
                              "-Ddatomic.memoryIndexMax=128m"]
                   :dependencies [[org.clojure/tools.namespace "0.2.10"]
                                  [hawk "0.2.4"]]
                   :repl-options {:init-ns bunsen.repl
                                  :init (bunsen.repl/start!)}}})
