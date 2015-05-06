(defproject bunsen/notebook "0.1.0-SNAPSHOT"
  :description "bunsen publications service"
  :url "https://github.com/twosigma/bunsen"
  :main bunsen.notebook.service
  :jvm-opts ["-Xmx1536M"]
  :repositories {"my.datomic.com"
                 {:url "https://my.datomic.com/repo"
                  :username "will@mojotech.com"
                  :password "9b571a50-cb08-48ba-bd2c-86ccf58b1ad2"}}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/tools.cli "0.3.1"]
                 [org.clojure/data.codec "0.1.0"]
                 [com.stuartsierra/component "0.2.2"]
                 [com.datomic/datomic-pro "0.9.5153"]
                 [ring "1.3.1"]
                 [bidi "1.10.4" :exclusions [org.clojure/clojure]]
                 [liberator "0.12.1"]
                 [ring/ring-json "0.3.1"]
                 [clj-time "0.9.0"]
                 [io.rkn/conformity "0.3.3"]
                 [environ "1.0.0"]]
  :plugins [[lein-environ "1.0.0"]]
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
                                  [org.clojure/tools.namespace "0.2.7"]]}}
  :aliases {"build" ["do" ["clean"] ["uberjar"]]})
