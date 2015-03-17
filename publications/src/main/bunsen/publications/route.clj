(ns bunsen.publications.route)

(def routes
  {"/publications/v1" {"/status" :status
                       "/publications" {"" :publications
                                        ["/" :id] :publication
                                        "_count" :publications-count}}})
