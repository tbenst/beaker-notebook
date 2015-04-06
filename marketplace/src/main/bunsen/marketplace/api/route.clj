(ns bunsen.marketplace.api.route)

(def routes
  ["/marketplace/v1" {"/status" :status
                      "/categories" :categories
                      "/datasets" :datasets
                      "/refresh" :refresh
                      "/counts" :counts
                      "/indices" {"" :indices
                                  ["/" :index-name  "/datasets/" :id] :dataset}
                      "/mappings" :mappings
                      "/formats" :formats
                      "/tags" :tags
                      }])
