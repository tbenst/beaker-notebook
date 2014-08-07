#!/bin/bash -e
set -o errexit -o pipefail

export BEAKER_IMAGE=$1
export BUNSEN_MATCH=$2

for i in "${@:3}"
do
echo i=$i
case $i in
  --shell) shell=1 ;;
  -h|--help)
    cat <<EOF

  Usage: gateway (beaker_image) (ui_host):(ui_port) [options]
  Options:
          -h  --help                  Display this message
          --shell                     Open interactive shell

EOF
    exit
    ;;
esac
done

/etc/init.d/haproxy start

cd /opt/gateway/

if [[ $shell -eq 1 ]]; then
  exec /bin/bash
else
  exec ./watch.sh
fi
