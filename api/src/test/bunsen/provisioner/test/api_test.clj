(ns bunsen.provisioner.test.api-test
  (:require [bunsen.repl :refer [system]]
            [bunsen.provisioner.api :as api]
            [bunsen.provisioner.model.beaker :as b]
            [datomic.api :as d]
            [clojure.test :refer :all]))

(defn init-system [f]
  (def conn (-> bunsen.repl/system :datomic :conn))
  (def container-service (-> bunsen.repl/system :container))
  (f))

(use-fixtures :once init-system)

(def user-id "558d595c-68d4-4e0a-a111-3a0e1870b0a5")

(deftest test-with-user
  (let [config {:default-user "defaultman"}]
    (testing "default user if no remote-user specified"
      (let [remote-user nil
            container (#'api/with-user {} config remote-user)]
        (is (= (:default-user config) (:user container)))
        ))
    (testing "username prefix if remote-user is present"
      (let [remote-user "john@brown.edu"
            container (#'api/with-user {} config remote-user)]
        (is (= "john" (:user container)))
        ))))

(deftest test-with-routing
  (testing "routing env vars set with BAMBOO_HOST present"
    (let [config {:bamboo-host "10.10.10.10"}
          container (#'api/with-routing {} config user-id)]
      (is (= (get-in container [:env "BAMBOO_HOST"]) (:bamboo-host config)))
      (is (= (get-in container [:env "BAMBOO_PATH"]) (str "/beaker/" user-id "/")))))

  (testing "routing omits BAMBOO_HOST if no config var"
    (let [config {}
          container (#'api/with-routing {} config user-id)]
      (is (not (contains? (:env container) :bamboo-host))))))

(deftest test-with-security
  (let [remote-user "u@r.edu"
        token "boom"
        container (#'api/with-security {} remote-user token)
        env (:env container)]
    (testing "security related container env vars withed"
      (is (= (env "BEAKER_COOKIE") token))
      (is (= (env "USE_SSL") "true"))
      (is (= (env "AUTHORIZED_USER") remote-user))
      )))

(deftest test-with-volumes
  (let [store-root "/var/me/"
        config {:store-root store-root}
        container (#'api/with-volumes {} config user-id)
        volume (-> container :volumes first)]
    (testing "container has scratch space volume"
      (is (= (:mode volume) "RW"))
      (is (= (:host volume) (str store-root "/" user-id)))
      (is (= (:container volume) "/mnt/scratch"))
      )))

(deftest test-create-container!
  (let [container (api/create-container! {:conn conn
                                          :user-id user-id
                                          :config {}
                                          :container container-service
                                          :remote-user "u@r.edu"})]
    (testing "side effect: datomic record of container created"
      (is (= (:token container) (-> conn
                                    (d/db)
                                    (b/find-beaker-by-user-id user-id)
                                    :beaker/token))))
    ))

