(ns bunsen.notebook.helper.notebook)

(defn fix-notebook-format [notebook]
  (assoc notebook :publication (first (:publication/_notebook notebook))))
