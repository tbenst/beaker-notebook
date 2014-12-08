bunsen
======

Big data for fun and profit.

## Setting up Vagrant with Virtual Box
To prevent slow uploading when building images you must enable a `virtio-net` adapter for your given VM.

<img src="docs/virtual-box-network.png" width="400px">

## Understanding How we Use ElasticSearch

#### [Read All about it](elastic_search_for_us.md)

## Docker 101
We use docker ([CLI](https://docs.docker.com/reference/commandline/cli)) to create images and containers to run
Bunsen's different components (db, app [api server], web, beaker, provisioner, & gateway)
  * Common Commands:
    * Build images with `docker build <component>` (see below for auto build script)
    * Run a container with `docker run <container>` (many options are required for bunsen, see below for auto run script)
    * Tail a container's log with `docker logs -f <container>`
    * Stop a container with `docker stop <container>`
    * Restart a container with `docker restart <container>`
    * Remove a container with `docker rm <container>`
    * List running containers with `docker ps`
    * Stop all containers with `docker stop $(docker ps -q)`
  * Other info:
    * Because each container is isolated with its own process namespace, you'll need to run bash in the container
      to run commands in the proper context.  Assuming you're running your docker containers in vagrant, Attach to a
      running container by running `docker exec -it app bash` or whichever container, and then run commands like one
      would normally in the server
    * One may occasionally get `Cannot start container: Port has already been allocated`.
      [This bug](https://github.com/docker/docker/issues/6476) is known, and in the meantime, just restart docker.
      (`vagrant ssh`, then once ssh'ed, `sudo systemctl restart docker`)

## To run the application locally
  * Ensure that your vagrant is running and provisioned.
    * `$ vagrant up`
  * Ensure your docker client is using the docker server running inside vagrant.
    * e.g. `export DOCKER_HOST=tcp://127.0.0.1:4243`
  * Build your docker images.
    * `$ ./script/build.sh` (or specify image, ex: `$ ./script/build.sh beaker`)
  * Initialize the persistent development database.
    * `docker run  --volume="/var/bunsen_dbs/:/var/lib/postgresql/9.3/main" db -c -f --database=bunsenDevelopment`
  * Run your docker containers.
    * `$ ./script/run.sh` (or specify image, ex: `$ ./script/run.sh app`) (run `bash -x run.sh` to show full docker commands)
  * Browse to http://localhost:8888/

## Seeding your development env

* First ensure that your containers are all running.
* Then run the following:

```bash
docker run -e NODE_ENV=development -e CIPHER_KEY=Auj/QL_WU[xX64p+1TB81m6AD6wSCl -v /vagrant/app:/var/app --link db:db --link provisioner:provisioner --link elasticsearch:elasticsearch app --migrate --delay=25 --seed --index -r
```

## Looking at the database.

* `docker exec -it db bash`
* `su postgres`
* `psql bunsenDevelopment`


## To run the test suite
  * Ensure that your vagant is running and provisioned, and your docker images are built (specified above).
  * Run your docker test containers.
    * To run in test mode (mount volumes for easier editing):
      * `$ ./script/run.sh -t` (or specify image, ex: `$ ./script/run.sh -t db`)
    * To run in ci mode (running the entire suite w/o mounting):
      * `$ ./script/run.sh --env=ci` (or specify image, ex: `$ ./script/run.sh --env=ci db`)
  * Run `$ npm start` in the `tests` directory.

## Debugging tests
  * If you get a seed populate error or socket hang up on first few tests, try cancelling running tests and waiting (app takes 15-20 seconds after running containers to be ready)
  * Run one or more specific tests by tagging them with `@failed` and running `npm run-script failures` in the `tests` directory.
  * Run `@failed` scenarios under node-debug (allowing you to use Chrome web inspector to debug JS code) by running `npm run-script test` in the `tests` directory.

## Adding node packages

#### [Learn how to](adding_node_packages.md)

## Updating embeded beaker-notebook

The beaker directory uses a [git subtree](https://github.com/git/git/blob/master/contrib/subtree/git-subtree.txt) to vendor the beaker-notebook repo. There are changes on this repo that are specific to the Bunsen world.

To update the beaker-notebook:
  * checkout `bunsen` branch of [beaker-notebook](http://github.com/twosigma/beaker-notebook.git) repo and make your changes
  * `$ cd core`
  * `$ npm install`
  * `$ npm run compile`
  * commit and push changes to bunsen branch on github
  * switch back to the `bunsen` project
  * git subtree pull --prefix=beaker/beaker-notebook http://github.com/twosigma/beaker-notebook.git bunsen
(For development, it's easier to make the changes directly in `bunsen/beaker/beaker-notebook` and run `cd core && npm install && npm run compile` from there.)
