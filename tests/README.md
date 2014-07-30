Bunsen Integration tests.
============

Building
  * fig up

## Running

  * make sure that your vagrant instance is running and provisioned. (via vagrant up)

  * run `fig up` in one console.  This will start the database, node server, front end, and beaker all in their own docker containers.  Leave it open to observe output.

  * In another console, run `npm start`.  This will launch the integration tests against the already-running Dockerized bunsen services.

## Developing

  * `$ fig run-script test` will run the tests tagged with `@failed` under node-debug (which will allow you to use Chrome web inspector to interactively explore the running javascript code).

  * To run just one scenario at a time, tag it with `@failed` and then run `npm run-script failures`
