Bunsen Integration tests.
============

## Instructions
  * Have the "app" server running (see [here](../app/README.md)).  You should run it in "test" mode (i.e. with NODE_ENV environment variable set to "test"), pointing to a separate database from the development database, because the tests will truncate all of your tables.
  * Compile the frontend. (see [here](../front_end/readme.md)).
  * Copy config.json.sample to config.json, and as necessary, make the values therein reflect your local installation.  For example, you will need to enter a valid url by which "index.html" of the frontend can be accessed.
  * "npm start" will run the integration test suite.
  * "npm debug" will run the test suite under node-debug (which will allow you to use Chrome web inspector to interactively explore the running javascript code).
