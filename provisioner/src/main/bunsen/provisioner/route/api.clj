(ns bunsen.provisioner.route.api)

(def routes
  {"/api/v1" {"/status" :status
              "/instance" {"" :instances
                           ["/" :id] :instance}}})
