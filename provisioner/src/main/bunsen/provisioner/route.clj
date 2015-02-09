(ns bunsen.provisioner.route)

(def routes
  {"/api/v1" {"/status" :status
              "/instance" {"" :instances
                           ["/" :id] :instance}}})
