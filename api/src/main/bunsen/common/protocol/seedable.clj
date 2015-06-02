(ns bunsen.common.protocol.seedable)

(defprotocol Seedable
  "Provides an abstraction to seed a component with data and reset it to an initial state."
  (seed! [this data] "Injects some data into a component.")
  (unseed! [this] "Resets a component to its initial state."))
