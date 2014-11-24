Test Running Protocol
=========

Due to timeouts and the async nature of this application there are intermittent failues.
Here are the steps to run your tests and fix tests.

* Run all your tests (either locally or on the CI).
* Mark each failing test with a `@failing` tag and run only the failing tests.
* Rerun the failing specs 2 times and take note which fail.
* Mark the tests that failed in the above runs with failing and remove those that do not match the criteria.
* Fix the marked tests.

If CI gets "stuck", you can access the display running on CI like this:

* ssh -f -N -T -L 5900:localhost:5900 ci-a.local.withmojo.com
* vncviewer localhost:5900

## Coverage

* In ci env,  code coverage reports are available for both the
client-side javascript  and the "api" node service.
*  After a test run, to access test coverage locally for the frontend, visit /coverage.
*  To access test coverage locally for the API, visit /api/coverage.
* In addition,  the full test coverage report is now archived along with each test run on
  our Jenkins continuous integration server.
* To look at the coverage report,  click on the test run in Jenkins, and
  click on "Status".
* There will be two archived zipfile artifacts,
    client\_coverage.zip and api\_coverage.zip.
* To examine either report, just download it, extract the zipfile, and
    open index.html in your browser.
