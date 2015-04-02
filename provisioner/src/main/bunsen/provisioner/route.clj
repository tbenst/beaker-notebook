(ns bunsen.provisioner.route)

(def routes
  ["/" {"provisioner/v1" {"/status" :status
                          "/instance" :instance}}])
