(defproject bunsen "0.1.0-SNAPSHOT"
  :description "Big data for fun and profit."
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [bunsen/common _]
                 [bunsen/user _]
                 [bunsen/vendor _]
                 [bunsen/provisioner _]
                 [bunsen/notebook _]
                 [bunsen/marketplace _]]
  :plugins [[lein-modules "0.3.10"]]
  :modules {:versions {bunsen :version
                       org.clojure/clojure "1.6.0"
                       org.clojure/data.json "0.2.5"
                       org.clojure/tools.namespace "0.2.9"
                       com.stuartsierra/component "0.2.2"
                       ring "1.3.1"
                       ring/ring-json "0.3.1"
                       bidi "1.18.9"
                       environ "1.0.0"
                       liberator "0.13"
                       hawk "0.2.4"
                       wkf/clj-http "1.0.1-SNAPSHOT-MOJO"}
            :inherited {:url "https://github.com/twosigma/bunsen"
                        :scm {:name "git"
                              :url "https://github.com/twosigma/bunsen"}
                        :jvm-opts ["-Dsun.security.jgss.native=true"]}
            :subprocess false})
