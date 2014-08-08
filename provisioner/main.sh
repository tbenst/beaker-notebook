#!/bin/bash -e

set -o nounset -o errexit -o pipefail

export BEAKER_IMAGE=$1

for i in "${@:2}"
do
case $i in
  --shell) shell=1 ;;
  -h|--help)
    cat <<EOF

  Usage: provisioner (beaker_image) [options]
  Options:
          -h  --help                  Display this message
          --shell                     Open interactive shell

EOF
    exit
    ;;
esac
done

cd /opt/provisioner

if [[ ${shell+$shell} -eq 1 ]]; then
  exec /bin/bash
else
  exec node app.js
fi
