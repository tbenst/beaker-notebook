(ns bunsen.user.route)

(def routes
  ["/" {"user/v1" {"/status" :status
                   "/users" :users
                   "/session" :session
                   "/sessions" :sessions}}])
