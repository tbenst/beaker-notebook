bunsen
======

Big data for fun and profit.

## Setting up Vagrant with Virtual Box
To prevent slow uploading when building images you must enable a `virtio-net` adapter for your given VM.

<img src="docs/virtual-box-network.png" width="400px">

## Understanding How we Use ElasticSearch

#### [Read All about it](docs/elasticsearch_for_us.md)

## To run the application locally
  * Ensure that your vagrant is running and provisioned.
    * `$ vagrant up`
  * Ensure your docker client is using the docker server running inside vagrant.
    * e.g. `export DOCKER_HOST=tcp://127.0.0.1:4243`
  * Build your docker images.
    * `$ make -j8` (or specify image, ex: `$ make beaker`)
  * Run your services and add to marathon
    * `$ make start`
  * Configure Bamboo for wiring
    * `$ make wire`
  * Add the following lines to your host machine's `/etc/hosts`
    * `10.10.10.10    bunsen-dev`
    * `10.10.10.10    bunsen-test`
  * Browse to http://bunsen-dev/

## Debugging
  * List running containers with `docker ps`
  * Tail a container's log with `docker logs -f <container>`
  * Run bash in a running container with `docker exec -it <container> bash`
  * Looking at the database:
    * get container id or name from `docker ps | grep postgres`
    * `docker exec -it <container> bash`
    * `su postgres`
    * `psql bunsenDevelopment`

## Seeding your development env

* First ensure that your containers are all running.
* Then run the following:

```bash
docker run -e NODE_ENV=development -e CIPHER_KEY=Auj/QL_WU[xX64p+1TB81m6AD6wSCl -v /vagrant/app:/var/app --link db:db --link provisioner:provisioner --link elasticsearch:elasticsearch app --migrate --delay=25 --seed --index -r
```

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

#### [Learn how to](docs/adding_node_packages.md)

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
