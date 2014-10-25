#!/usr/bin/env bash
set -o errexit -o pipefail -o nounset

cleanup() {
  docker ps -a -q | xargs --no-run-if-empty docker stop
  docker ps -a -q | xargs --no-run-if-empty docker rm
}

# this seems to be necessary to work around an aufs permissions bug
chmod 775 -R beaker/beaker-notebook

./script/build.sh --env=ci

cleanup

./script/run.sh --env=ci

docker logs -f ci.tests

exit $(docker inspect --format='{{.State.ExitCode}}' test.ci)
