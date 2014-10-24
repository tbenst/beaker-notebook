(defproject bunsen.provisioner "0.1.0-SNAPSHOT"
  :description "bunsen provisioner service"
  :url "https://github.com/twosigma/bunsen"
  :main bunsen.provisioner.service
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/tools.cli "0.3.1"]
                 [com.stuartsierra/component "0.2.2"]
                 [ring "1.3.1"]
                 [bidi "1.10.4"]
                 [liberator "0.12.1"]
                 [environ "1.0.0"]]
  :plugins [[lein-environ "1.0.0"]]
  :test-paths ["src/test"]
  :source-paths ["src/main"]
  :jvm-opts  ["-Xmx256M"]
  :profiles {:uberjar {:aot [bunsen.provisioner.service]}
             :dev {:env {:port 3001}
                   :source-paths ["src/dev"]
                   :dependencies [[ring-mock "0.1.5"]
                                  [org.clojure/tools.namespace "0.2.7"]]}
             :test {:env {:port 6001}}}
  :aliases {"build" ["do" ["clean"] ["uberjar"]]})
