(ns bunsen.marketplace.api.route)

(def routes
  ["/marketplace/v1" {"/status" :status
                      "/categories" :categories
                      "/seed/datasets" :seed-datasets
                      "/refresh" :refresh
                      "/counts" :counts
                      "/indices" {"" :indices
                                  ["/" :index-name  "/datasets/" :id] :dataset}
                      "/mappings" :mappings
                      "/formats" :formats
                      "/tags" :tags
                      "/vendors" :vendors
                      }])
