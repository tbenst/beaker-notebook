(ns bunsen.provisioner.component.config
  (:require [clojure.java.io :as io]
            [clojure.data.json :as json]))

(defn config
  "
  :bamboo-url, ex: cluster-slave-a-0:8000
  :marathon-url, ex: cluster-master-a:8080
  :app-group, ex: /bunsen-staging/beaker
  :service-host, ex: bunsen-staging.withmojo.com
  :service-path, ex: /beaker
  "
  [env]
  {:server-port (Integer. (:server-port env))
   :bamboo-url (:bamboo-url env)
   :marathon-url (:marathon-url env)
   :app-group (:app-group env)
   :app-template (json/read-str
                   (if-let [template (:app-template env)]
                     template
                     (slurp (:app-template-path env))))
   :service-host (:service-host env)
   :service-path (:service-path env)})
