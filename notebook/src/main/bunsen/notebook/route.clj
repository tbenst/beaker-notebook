(ns bunsen.notebook.route)

(def routes
  ["/" {"notebook/v1" {"/status" :status
                       "/projects" {"" :projects
                                    ["/" :project-id] {"" :project
                                                       "/notebook" :notebook
                                                       "/notebooks" :notebooks}}
                       "/publications" {"" :publications
                                        "_count" :publications-count
                                        ["/" :id] {"" :publication
                                                   "/notebook" :publication-contents
                                                   "/ratings" :ratings
                                                   "/rating" :rating}}
                       "/notebooks" {"" :notebooks
                                     ["/" :notebook-id]
                                     {"" :notebook
                                      "/contents" :notebook-contents}}
                       "/categories" {"" :categories
                                      ["/" :id] :category}
                       "/seed" {"" :seed
                                "/projects" :seed-projects
                                "/notebooks" :seed-notebooks}}}])
