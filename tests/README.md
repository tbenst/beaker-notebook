Bunsen Integration tests.
============

## Running
  * make sure that your vagrant instance is running and provisioned.
  * run "fig run" in one console.  This will start the database, node server, front end, and beaker all in their own docker containers.  Leave it open to observe output.
  * In another console, run "npm start".  This will launch the integration tests against the already-running Dockerized bunsen services.

## Developing

  * `$ npm debug` will run the test suite under node-debug (which will allow you to use Chrome web inspector to interactively explore the running javascript code).
  * To run just one feature file at a time, for the time being, the best idea is probably to edit one of predefined NPM tasks.  Look in package.json, find the task that you want to modify, and substitute out "features/" for just the file you want to run.  Then revert the change before you push.
