(ns bunsen.marketplace.api.route)

(def routes
  ["/marketplace/v1" {"/status" :status
                      "/categories" :categories
                      "/seed" {"/subscriptions" :seed-subscriptions
                               "/datasets" :seed-datasets}
                      "/refresh" :refresh
                      "/counts" :counts
                      "/indices" {"" :indices
                                  ["/" :index-name "/datasets"] :datasets
                                  ["/" :index-name  "/datasets/" :id] {"" :dataset
                                                                       "/average-rating" :average-rating
                                                                       "/rating" :rating}}
                      "/mappings" :mappings
                      "/formats" :formats
                      "/tags" :tags
                      "/vendors" :vendors
                      "/subscriptions" {"" :subscriptions
                                        ["/" :index-name "/" :data-set-id] :subscription}
                      }])
