# Quick start guide to local development

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

## Running tests

Check the docs for the [Test service](services/test.md)
