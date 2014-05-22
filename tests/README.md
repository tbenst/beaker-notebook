Bunsen Integration tests.
============

## Setup

  * `$ npm install`
  * `$ createdb "bunsenTest"` or whatever you have specified within your `app/config.js`

## Running

  Currently tests require you to open 3 shell instances. The following commands assume that the current directory of your shells are the tests directory.

  * `$ cd ../app && NODE_ENV=test npm run-script migrate && npm run-script start-test`
  * `$ cd ../front_end && NODE_ENV=test npm run-script test-server`
  * `$ npm run-script start`

## Developing

  * `$ npm debug` will run the test suite under node-debug (which will allow you to use Chrome web inspector to interactively explore the running javascript code).
  * To run just one feature file at a time, for the time being, the best idea is probably to edit one of predefined NPM tasks.  Look in package.json, find the task that you want to modify, and substitute out "features/" for just the file you want to run.  Then revert the change before you push.
