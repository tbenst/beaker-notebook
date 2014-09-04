#!/bin/bash -e

set -o nounset -o errexit -o pipefail

export BEAKER_IMAGE=$1
export BEAKER_CONTAINER_PATTERN=$2

for i in "${@:3}"
do
case $i in
  -h|--help)
    cat <<EOF

  Usage: provisioner (beaker_image) (beaker_container_pattern) [options]

  beaker_image is the name of the image from which beakers are built.
  (it's "beaker" both in dev and test, something else in deployed envs).

  beaker_container_pattern tells the Provisioner how to name
  and identify beaker containers.  Currently supported:  /beaker.
  for development and /test.beaker for test environment.

  Options:
          -h  --help                  Display this message

EOF
    exit
    ;;
esac
done

cd /opt/provisioner

exec node app.js
