# Virtualized development environment.

## To run the application locally
  * Ensure that your vagrant is running and provisioned.
    * `$ vagrant up`
  * Build your docker images.
    * `$ make -j8` (or specify image, ex: `$ make beaker`)
  * Add the following lines to your host machine's `/etc/hosts`
    * `10.10.10.10    bunsen-dev`
    * `10.10.10.10    bunsen-test`
    * `10.10.10.10    beaker-dev`
    * `10.10.10.10    beaker-test`
  * Ensure your docker client is using the docker server running inside vagrant.
    * e.g. `export MARATHON_HOST=10.10.10.10:8080`
  * Run your services and add to marathon
    * `$ make deploy-bunsen-dev`
    * `$ make deploy-beaker-dev`
  * Browse to http://bunsen-dev/ to access Bunsen web app or to http://bunsen-dev/solo/publications.html to access Publications app

## Running tests

  * Make sure vagrant is running
    * `vagrant up`

  * Build all docker images
    * `make`

  * There are a few integration and unit tests.  The commands to run each can be found in the [Makefile](../../Makefile)


Check the docs for the [Test service](../services/tests.md)
