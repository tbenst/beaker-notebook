bunsen
======

## Big data for fun and profit.

## [Setting up your environment](docs/setting-up-your-environment.md)

## Microservices

Bunsen utilizes
[Microservices](http://martinfowler.com/articles/microservices.html).

This makes some things simpler, and other things more complicated.

[Here](docs/services/index.md) is a page that enumerates all of the services that comprise Bunsen, and
describes each of them and how they interrelate.

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

## Seeding your development env

* First ensure that your containers are all running.
* Then run the following:

```bash
make run-seed
make run-index
```

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
