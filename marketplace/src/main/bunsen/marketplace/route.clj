(ns bunsen.marketplace.route)

(def routes
  ["/marketplace/v1"
   {"/status" :status
    "/categories" :categories
    "/seed" {"/subscriptions" :seed-subscriptions
             "/datasets" :seed-datasets}
    "/refresh" :refresh-index
    "/indices" {"" :indices
                ["/" :index-name "/datasets"] :datasets
                ["/" :index-name  "/datasets/" :dataset-id] {"" :dataset
                                                             "/average-rating" :average-rating
                                                             "/rating" :rating}}
    "/mappings" :mappings
    "/formats" :formats
    "/tags" :tags
    "/vendors" :vendors
    "/subscriptions" {"" :subscriptions
                      ["/" :index-name "/" :dataset-id] :subscription}}])
