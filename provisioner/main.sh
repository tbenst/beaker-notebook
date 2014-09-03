#!/bin/bash -e

set -o nounset -o errexit -o pipefail

export BEAKER_CONTAINER_PATTERN=$1

for i in "${@:2}"
do
case $i in
  -h|--help)
    cat <<EOF

  Usage: provisioner (beaker_container_pattern) [options]

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
