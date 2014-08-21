bunsen
======

Big data for fun and profit.

## Setting up Vagrant with Virtual Box
To prevent slow uploading when building images you must enable a `virtio-net` adapter for your given VM.

<img src="docs/virtual-box-network.png" width="400px">

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
