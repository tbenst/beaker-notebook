(defproject bunsen/common "0.1.0-SNAPSHOT"
  :description "Bunsen common module."
  :test-paths ["src/test"]
  :source-paths ["src/main"]
  :repositories {"my.datomic.com"
                 {:url "https://my.datomic.com/repo"
                  :username "will@mojotech.com"
                  :password "9b571a50-cb08-48ba-bd2c-86ccf58b1ad2"}}
  :dependencies [[org.clojure/clojure _]
                 [org.clojure/data.codec "0.1.0"]
                 [pandect "0.5.1"]
                 [wkf/clj-http _]
                 [myguidingstar/clansi "1.3.0"]
                 [com.datomic/datomic-pro "0.9.5153" :exclusions [joda-time]]
                 [io.rkn/conformity "0.3.3"]
                 [org.clojure/data.json _]]
  :plugins [[lein-modules "0.3.10"]])
