Test Running Protocol
=========

Due to timeouts and the async nature of this application there may be
intermittent failures when running the tests locally.  Here are the steps
to deal with this:

* Run all your tests (either locally or on the CI).
* Mark each failing test with a `@failing` tag and run only the failing tests.
* Rerun the failing specs 2 times and take note which fail.
* Mark the tests that failed in the above runs with failing and remove those that do not match the criteria.
* Fix the marked tests.

## Coverage

* In ci env,  code coverage reports are available for both the
client-side javascript  and the "api" node service.
*  After a test run, to access test coverage locally for the frontend, visit /coverage.
*  To access test coverage locally for the API, visit /api/coverage.
* In addition,  a summary of test coverage will be printed out to STDOUT
  whenever tests are run.
