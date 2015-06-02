(ns bunsen.notebook.route)

(def routes
  ["/" {"notebook/v1" {"/status" :status
                       "/projects" {"" :projects
                                    ["/" :project-id] {"" :project
                                                       "/notebooks" :notebooks
                                                       "/notebooks/import" :notebook-import}}
                       "/publications" {"" :publications
                                        "_count" :publications-count
                                        ["/" :pub-id] {"" :publication
                                                       "/notebook" :publication-contents
                                                       "/ratings" :ratings
                                                       "/rating" :rating}}
                       "/notebooks" {"" :notebooks
                                     ["/" :notebook-id] {"" :notebook
                                                         "/contents" :notebook-contents}}
                       "/categories" {"" :categories
                                      ["/" :cat-id] {"" :category
                                                     "/contributors" :contributors}}
                       "/contributors" :contributors
                       "/seed" {"" :seed
                                "/publications" :seed-publications
                                "/projects" :seed-projects
                                "/notebooks" :seed-notebooks}}}])
