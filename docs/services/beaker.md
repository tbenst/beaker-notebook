# Beaker Service

Beaker service provides the server of the actual Beaker Notebook interface.

Beaker essentially provides an alternate version of the [Beaker-notebook](http://beakernotebook.com/) project,
with modifications that make it suitable for running inside Bunsen (and
unsusable in a desktop context).

## How Beaker is run in Bunsen

TwoSigma publishes a Docker image for Beaker-notebook; we simply run this
docker image with certain command line parameters to act as the Beaker server
for Bunsen.

When running your native development environment, you will still normally
run the Beaker server via Docker.  For this reason, you need to have your
Vagrant server up and running, so that Beaker server can be run.


## Updating embededd beaker-server

In the event that the behavior of beaker-server changes, you will
want to make this new version available to Bunsen.
To accomplish this, you'll need to ask Scott to update the development docker image
https://registry.hub.docker.com/u/beakernotebook/beaker-prerelease/ and give the build
a unique tag, and update Procfile, Makefile, and bunsen-staging.json with the new tag.
