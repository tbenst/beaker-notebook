Bunsen Integration tests.
============

## Setup

  * `$ npm install`
  * `$ cp config.json.sample config.json`
    * Modify the values therein to reflect your local installation. For example, you will need to enter a valid url by which "index.html" of the frontend can be accessed.
  * `$ createdb "bunsenTest"` or whatever you have specified within your `app/config.js`

## Running

  Currently tests require you to open 3 shell instances. The following commands assume that the current directory of your shells are the tests directory.

  * `$ cd ../app && NODE_ENV=test npm run-script migrate && npm run-script start-test`
  * `$ cd ../front_end && NODE_ENV=test npm run-script compile`
  * `$ npm run-script start`

## Developing

  * `$ npm debug` will run the test suite under node-debug (which will allow you to use Chrome web inspector to interactively explore the running javascript code).
