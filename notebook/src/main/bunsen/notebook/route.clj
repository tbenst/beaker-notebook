(ns bunsen.notebook.route)

(def routes
  ["/" {"notebook/v1" {"/status" :status
                       "/projects" {"" :projects
                                    ["/" :id] :project}
                       "/publications" {"" :publications
                                        "_count" :publications-count
                                        ["/" :id] {"" :publication
                                                   "/notebook" :notebook
                                                   "/ratings" :ratings
                                                   "/rating" :rating}}
                       "/categories" {"" :categories
                                      ["/" :id] :category}
                       "/seed" :seed}}])
