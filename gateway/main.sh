#!/bin/bash -e
set -o errexit -o pipefail

export BEAKER_IMAGE=$1
export BUNSEN_MATCH=$2
export BEAKER_PORT=8801

for i in "${@:3}"
do
echo i=$i
case $i in
  -h|--help)
    cat <<EOF

  Usage: gateway (beaker_image) (ui_host):(ui_port) [options]
  Options:
          -h  --help                  Display this message

EOF
    exit
    ;;
esac
done

/etc/init.d/haproxy start

cd /opt/gateway/

exec ./watch.sh
