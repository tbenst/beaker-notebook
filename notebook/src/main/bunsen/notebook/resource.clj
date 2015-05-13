(ns bunsen.notebook.resource
  (:require [liberator.core :refer [defresource]]
            [bunsen.notebook.resource.defaults :refer [defaults]]
            [bunsen.notebook.resource.seed :refer [seed]]
            [bunsen.notebook.resource.publication :refer [publication]]
            [bunsen.notebook.resource.project :refer [project]]
            [bunsen.notebook.resource.projects :refer [projects]]
            [bunsen.notebook.resource.notebook :refer [notebook]]
            [bunsen.notebook.resource.notebook-contents :refer [notebook-contents]]
            [bunsen.notebook.resource.publication-contents :refer [publication-contents]]
            [bunsen.notebook.resource.publications :refer [publications]]
            [bunsen.notebook.resource.publications-count :refer [publications-count]]
            [bunsen.notebook.resource.category :refer [category]]
            [bunsen.notebook.resource.categories :refer [categories]]
            [bunsen.notebook.resource.rating :refer [rating]]
            [bunsen.notebook.resource.ratings :refer [ratings]]))

(defresource status [_] defaults
  :handle-ok (constantly "ok"))

(def resources
  {:status status
   :publication publication
   :publications publications
   :publications-count publications-count
   :publication-contents publication-contents
   :project project
   :projects projects
   :notebook notebook
   :notebook-contents notebook-contents
   :category category
   :categories categories
   :rating rating
   :ratings ratings
   :seed seed})
