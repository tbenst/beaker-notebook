# Tests service

## To run the test suite
  * Ensure that your vagant is running and provisioned, and your docker images are built.
  * To set up the Bunsen environment in test mode, run: `$ make HOST=bunsen-test CONFIG=config/test.jq`
  * To run the tests using entirely processes isolated to a Docker: `$ make
    HOST=bunsen-test CONFIG=config/test.jq`  (you will see the test output, but
    won't be able to visually see the browser).
  * To run the tests using a browser on your host desktop OS, run: `$ npm start`
    in the `tests` directory.  (This way, you will be able to visually see the
    browser interacting with the running Bunsen environment).

## Debugging tests
  * If you get a seed populate error or socket hang up on first few tests, try cancelling running tests and waiting (app takes 15-20 seconds after running containers to be ready)
  * Run one or more specific tests by tagging them with `@failed` and running `npm run-script failures` in the `tests` directory.
  * Run `@failed` scenarios under node-debug (allowing you to use Chrome web inspector to debug JS code) by running `npm run-script test` in the `tests` directory.


## Protocol for test failures

Due to timeouts and the async nature of this application there may be
intermittent failures when running the tests locally.  Here are the steps
to deal with this:

* Run all your tests (either locally or on the CI).
* Mark each failing test with a `@failing` tag and run only the failing tests.
* Rerun the failing specs 2 times and take note which fail.
* Mark the tests that failed in the above runs with failing and remove those that do not match the criteria.
* Fix the marked tests.

## Coverage

* Code coverage reports are available for both the client-side javascript  and the "api" node service.
* After a test run, to access test coverage locally for the frontend, visit /coverage.
* To access test coverage locally for the API, visit /api/coverage.
* In addition,  A summary of test coverage will be printed out to STDOUT
  whenever tests are run.
