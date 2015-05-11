(defproject bunsen/notebook "0.1.0-SNAPSHOT"
  :description "bunsen project and notebook service"
  :url "https://github.com/twosigma/bunsen"
  :main bunsen.notebook.service
  :repositories {"my.datomic.com"
                 {:url "https://my.datomic.com/repo"
                  :username "will@mojotech.com"
                  :password "9b571a50-cb08-48ba-bd2c-86ccf58b1ad2"}}
  :dependencies [[bunsen/common _]
                 [org.clojure/clojure _]
                 [org.clojure/tools.cli "0.3.1"]
                 [org.clojure/data.codec "0.1.0"]
                 [com.stuartsierra/component _]
                 [com.datomic/datomic-pro "0.9.5153"]
                 [org.clojure/algo.generic "0.1.2"]
                 [ring _]
                 [bidi _ :exclusions [org.clojure/clojure]]
                 [liberator _]
                 [ring/ring-json _]
                 [clj-time "0.9.0"]
                 [io.rkn/conformity "0.3.3"]
                 [environ _]]
  :plugins [[lein-environ "1.0.0"]
            [lein-modules "0.3.10"]]
  :test-paths ["src/test"]
  :source-paths ["src/main"]
  :profiles {:uberjar {:aot [bunsen.notebook.service]}
             :dev {:env {:server-port 3003
                         :database-uri "datomic:mem://publications"
                         :seed-file "seed.edn"}
                   :repl-options {:init (user/watch)}
                   :source-paths ["src/dev"]
                   :dependencies [[hawk "0.1.1"]
                                  [ring-mock "0.1.5"]
                                  [org.clojure/tools.namespace "0.2.7"]]}})
