bunsen
======

Big data for fun and profit.

## Setting up Vagrant with Virtual Box
To prevent slow uploading when building images you must enable a `virtio-net` adapter for your given VM.

<img src="docs/virtual-box-network.png" width="400px">

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
      running container by running `./attach.sh app` or whichever container, and then run commands like one
      would normally in the server
    * One may occasionally get `Cannot start container: Port has already been allocated`.
      [This bug](https://github.com/docker/docker/issues/6476) is known, and in the meantime, just restart docker.
      (`vagrant ssh`, then once ssh'ed, `sudo systemctl restart docker`)

## To run the application locally
  * Ensure that your vagrant is running and provisioned.
    * `$ vagrant up`
  * Build your docker images.
    * `$ ./build.sh` (or specify image, ex: `$ ./build.sh beaker`)
  * Run your docker containers.
    * `$ ./run.sh` (or specify image, ex: `$ ./run.sh app`) (run `bash -x run.sh` to show full docker commands)
  * Browse to http://localhost:7777/

## To run the test suite
  * Ensure that your vagant is running and provisioned, and your docker images are built (specified above).
  * Make sure your other docker containers are stopped (you need the ports)
    * `$ docker stop $(docker ps -q)`
  * Run your docker test containers.
    * `$ ./run.sh -t` (or specify image, ex: `$ ./run.sh db`)
  * Run `$ npm start` in the `tests` directory.

### Debugging tests
  * If you get a seed populate error or socket hang up on first few tests, try cancelling running tests and waiting (app takes 15-20 seconds after running containers to be ready)
  * Run one or more specific tests by tagging them with `@failed` and running `npm run-script failures` in the `tests` directory.
  * Run `@failed` scenarios under node-debug (allowing you to use Chrome web inspector to debug JS code) by running `npm run-script test` in the `tests` directory.
