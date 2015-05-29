(ns bunsen.common.helper.handler
  (:require [bidi.ring :as ring]
            [bidi.bidi :as bidi]
            [clojure.algo.generic.functor :refer [fmap]]))

(defn make-handler
  "Attaches liberator resources to a bidi route spec. Liberator
   resources receive the request params map as an argument."
  [routes resources]
  (-> (bidi/compile-route routes)
      (ring/make-handler
        (fmap
          #(fn [req]
             ((-> req :params %) req))
          resources))))
