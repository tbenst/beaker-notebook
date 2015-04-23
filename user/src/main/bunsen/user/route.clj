(ns bunsen.user.route)

(def routes
  ["/" {"user/v1" {"/status" :status
                   "/user" :user
                   "/users" :users
                   "/session" :session
                   "/sessions" :sessions}}])
