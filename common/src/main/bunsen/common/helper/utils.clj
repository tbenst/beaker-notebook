(ns bunsen.common.helper.utils)

(defn uuid-from-str [s]
  (java.util.UUID/fromString s))

(defn namespace-keys
  "Adds namespace prefix to each param. Useful for transforming request params into Datomic format,
  for example: (namespace-keys {:age 1} \"user\") returns {:user/age 1}."
  [params entity-ns]
  (reduce-kv #(assoc %1 (keyword entity-ns (name %2)) %3) {} params))

(defn remove-nils [params]
  (into {} (remove (comp nil? second) params)))
