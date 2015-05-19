# Beaker Service

Beaker service provides the server of the actual Beaker Notebook interface.

Beaker essentially provides an alternate version of the [Beaker-notebook](http://beakernotebook.com/) project,
with modifications that make it suitable for running inside Bunsen (and
unsusable in a desktop context).


## Updating embeded beaker-server

The beaker directory uses a [git submodule](http://git-scm.com/docs/git-submodule) to vendor the beaker-server.
There are changes on this repo that are specific to the Bunsen world.

To update the beaker-server submodule:

(http://stackoverflow.com/questions/8813249/git-submodules-specify-a-specific-sha)

  * Update the submodule like any other repo
    * `cd beaker/beaker-server`
    * `git fetch`
    * `git checkout origin/bunsen_integration`
  * Commit your changes in the base project

Keep in mind that this will only change the local versions.  In order to make a version
available in staging/ci, you'll need to ask Scott to update the development docker image
https://registry.hub.docker.com/u/beakernotebook/beaker-prerelease/ and give the build
a unique tag, and update bunsen-staging.json with the new tag.
