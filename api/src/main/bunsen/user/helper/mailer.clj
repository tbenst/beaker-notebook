(ns bunsen.user.helper.mailer
  (:require [environ.core :refer [env]]
            [postal.core :refer [send-message]]))

(defn smtp-conn [config]
  {:host (:mandrill-host config)
   :ssl true
   :user (:mandrill-user config)
   :pass (:mandrill-pass config)})

(defn send-password-reset-email [config email token]
  (send-message (smtp-conn config)
                {:from "ops+bunsen@mojotech.com"
                 :to email
                 :subject "Reset Bunsen Password"
                 :body [{:type "text/html"
                         :content (str "<p>You recently requested a link to reset your Bunsen password.</br>Please set a new password by following the link below:</br></p>"
                                       "<a href=http://" (:hostname config) "/#/change_password?id=" token "> Reset Bunsen Password </a>")}]}))
