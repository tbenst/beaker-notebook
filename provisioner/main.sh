#!/bin/bash -e

set -o nounset -o errexit -o pipefail

export BEAKER_IMAGE=$1

for i in "${@:2}"
do
case $i in
  -h|--help)
    cat <<EOF

  Usage: provisioner (beaker_image) [options]
  Options:
          -h  --help                  Display this message

EOF
    exit
    ;;
esac
done

cd /opt/provisioner

exec node app.js
