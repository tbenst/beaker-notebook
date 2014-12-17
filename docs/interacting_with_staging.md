### Connect to staging

  * kinit
  * First connect to the staging box via `ssh <username>@build.withmojo.com`
    * If you recieve a connection closed message you do not have an account on the server, ask will@mojotech.com for one.
  * the staging environment is described very precisely in the configuration file
    config/staging.jq. Just as you would look in dev.jq for details about the
    development environment, look in staging.jq for details about the staging
    environment.
  * you're going to need to run all commands that need to interact with docker
    with "sudo", e.g. `sudo docker ps`


### Connecting to the staging postgres database

Unlike in the dev environment, the database isn't managed by our deploy
process.  Instead, we use an externally hosted postgres server.  You can see the
access information for this external server in the environment variables for the
bunsen-managed services that need to connect to the db.  Your best bet is to use
this access info to connect to the external db directly and get a postgres prompt:

* `psql -h <EXTERNAL_DB_HOST> -U <EXTERNAL_DB_USER> -d <EXTERNAL_DB_NAME>`

### Accessing ElasticSearch on staging

As with postgres, the ElasticSearch used by staging is hosted externally and is
not managed directly by bunsen's deployment process.  Check staging's config
file for details about how to access ElasticSearch via your launching point on
the build server.

Note: Currently, an haproxy service needs to be running on build in order to
ensure access to staging's ElasticSearch instance from a containerized service.
It should be running all the time; if it isn't, contact will@mojotech.com.

### Running jobs on staging

Running a job (e.g. seed, index, any other entry in the "jobs"
section of the configuration file) on staging is really the same as running the
job on development, which make sense because the two environments are very
similiar in most ways.

1. Check out the bunsen source code on staging in your home directory
2. Build the container you want to build (e.g. api).
3. Run the job, making sure to specify that you are using the staging
   configuration:
    * sudo make CONFIG=config/staging.jq run-index


