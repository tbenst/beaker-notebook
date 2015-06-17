# Staging environment

### Connecting

The staging environment is hosted on Amazon AWS. Connecting to any machines in bunsen cloud requires Kerberos credentials. New users should contact <will@mojotech.com> for help.

Once you have credentials, connecting is straightforward:

1. `kinit` to acquire a kerberos ticket
2. `ssh` into the desired machine, ex: `ssh <user>@build.withmojo.com`

### Deploying

The easiest way to deploy is through the build server:

    ssh -t <user>@build.withmojo.com sudo /root/deploy-bunsen-staging.sh

### Accessing Datomic

1. find the mesos slave on which the datomic transactor is running at marathon.withmojo.com
2. `ssh` into the slave machine, ex: `ssh cluster-slave-a-0.withmojo.com`
3. use `docker` to run a clojure repl inside the transactor container: `sudo docker exec -it <transactor> /opt/datomic/bin/repl`
4. require the `datomic.api` namespace and connect to the staging database (the uri can be found in `config/bunsen-staging.json`)

### Accessing Elasticsearch

It's possible to connect to the staging elasticsearch instance remotely, just by using the uri in `config/bunsen-staging.json`.
