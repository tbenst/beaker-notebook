# CI environment

We use [Circle CI](http://www.circleci.com) for Continuous Integration.

Circle provides tools that let you customize the environment in which your tests
run, and we use these tools extensively.

Our [Circle config file](../../circle.yml) illustrates some of the overrides we
implement.  This file is consumed by Circle itself; check the Circle API docs to
understand the meaning of the data structures in this file.

One of the tasks in the "dependencies" section of circle.yml is "make
boostrap-ci".  If you look at the top-level [Makefile](../../Makefile), you can
see that this task launches [bootstrap_ci.sh](../../script/bootstrap_ci.sh).

Looking through bootstrap_ci.sh, you can see that various dependencies are
installed and configured on the Circle container in order to prepare for the
test run.  The file is documented with inline comments that explain the
reasoning for each customization.

## Best practices

* Do not use the Circle UI to customize anything about the test execution
  environment!  All configuration should be in files that are in source
  control. This is what will allow us to test config changes in a particular
  branch without interfering with the tests as other branches run using the old
  configuration.
* Exception to the above rule: secret environment variables (e.g. Amazon keys)
  must be set using the Circle UI.  Such things shouldn't be in source control. 

## Gotchas

* When circle upgrades postgres on their stack, it will cause tests
to fail.  (The API service will not be able to connect to postgres).
This is because bootstrap_ci.sh writes to file paths that contain the specific
postgres version (it's the only way to make the necessary changes on Circle)!
If this happens, the quick fix is to change the path from
e.g. /stuff/9.3/ to e.g. /stuff/9.4/.





