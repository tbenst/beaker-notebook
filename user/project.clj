(defproject bunsen/user "0.1.0-SNAPSHOT"
  :main bunsen.user.service
  :description "Manage Bunsen users."
  :test-paths ["src/test"]
  :source-paths ["src/main"]
  :repositories {"my.datomic.com"
                 {:url "https://my.datomic.com/repo"
                  :username "will@mojotech.com"
                  :password "9b571a50-cb08-48ba-bd2c-86ccf58b1ad2"}}
  :dependencies [[bunsen/common _]
                 [org.clojure/clojure _]
                 [org.clojure/data.json _]
                 [org.clojure/data.codec "0.1.0"]
                 [org.clojure/algo.generic "0.1.2"]
                 [ring _]
                 [ring/ring-json _]
                 [wkf/clj-http _]
                 [bidi _ :exclusions [org.clojure/clojure]]
                 [environ _]
                 [liberator _]
                 [com.stuartsierra/component _]
                 [com.datomic/datomic-pro "0.9.5153" :exclusions [joda-time]]
                 [com.datastax.cassandra/cassandra-driver-core "2.0.6"]
                 [crypto-password "0.1.3"]
                 [bouncer "0.3.2"]
                 [org.apache.httpcomponents/httpcore "4.3.2"]
                 [org.apache.httpcomponents/httpclient "4.3.2"]
                 [org.apache.httpcomponents/httpmime "4.3.2"]
                 [commons-codec "1.10"]
                 [commons-io "2.4"]
                 [org.clojure/data.json _]]
  :plugins [[lein-modules "0.3.10"]]
  :profiles {:uberjar {:aot [bunsen.user.service]}
             :dev {:source-paths ["src/dev"]
                   :repl-options {:init (user/watch)
                                  :init-ns user}
                   :dependencies [[hawk _]
                                  [ring-mock "0.1.5"]
                                  [org.clojure/tools.namespace "0.2.10"]]}})
