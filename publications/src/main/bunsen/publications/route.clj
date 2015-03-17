(ns bunsen.publications.route)

(def routes
  {"/publications/v1" {"/status" :status
                       "/publications" {["/" :id] :publication}}})
