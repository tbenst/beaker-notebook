(ns bunsen.marketplace.route)

(def routes
  ["/marketplace/v1"
   {"/status" :status
    "/categories" {"" :categories
                   ["/" :category-id] {"" :category}}
    "/seed" {"" :seed
             "/datasets" :seed-datasets
             "/subscriptions" :seed-subscriptions}
    "/refresh" :refresh-index
    "/indices" :indices
    "/catalogs" {"" :catalogs
                 ["/" :catalog-id "/datasets"] :datasets
                 ["/" :catalog-id "/datasets/" :dataset-id] {"" :dataset
                                                             "/average-rating" :average-rating
                                                             "/rating" :rating}}
    "/mappings" :mappings
    "/formats" :formats
    "/tags" :tags
    "/vendors" :vendors
    "/vendor" {["/" :vendor-id] :vendor}
    "/subscriptions" {"" :subscriptions
                      ["/" :catalog-id "/" :dataset-id] :subscription}}])
