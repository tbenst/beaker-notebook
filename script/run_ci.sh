#!/usr/bin/env bash
set -o errexit -o pipefail -o nounset

# this seems to be necessary to work around an aufs permissions bug
chmod 775 -R beaker/beaker-notebook

./script/build.sh

docker build --rm --force-rm -t="test" tests/

docker ps -a -q | xargs --no-run-if-empty docker stop
docker ps -a -q | xargs --no-run-if-empty docker rm

./script/run.sh --env=ci

until $(curl -o /dev/null -s --head --fail -H "Host:gateway" http://u:p@localhost:7778); do
  echo 'waiting for gateway server...'
  sleep 5
done

docker run --link=ci.gateway:gateway --name ci.test -p 5900:5900 test
