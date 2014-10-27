(ns bunsen.indexer.datasets)

(defn indexable-dataset
  "Generate a dataset in canonical form, ready to passed as a call to index in
  Elastische.  cat-ids refers to a list of id's of categories, which are presumed
  to already exist in the indexed-categories param."
  [id title cat-ids indexed-categories extra-attrs]
  (let [cats (map #(select-keys (indexed-categories (str %1)) [:id :name :path])
                  cat-ids)]
    (merge extra-attrs
           {:_id id ; Required for Elastische API
            :id id
            :title title
            :categories cats}
           )))
