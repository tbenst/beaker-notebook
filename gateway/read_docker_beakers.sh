#!/bin/bash
set -o errexit -o nounset -o pipefail

function join { local IFS="$1"; shift; echo "$*"; }

beakers=()

while read -r cid; do
  if [[ `docker inspect --format="{{.Config.Image}}" $cid` == $BEAKER_IMAGE ]]; then
    ip=`docker inspect --format="{{.NetworkSettings.IPAddress}}" $cid`
    stanza=$(cat <<EOF
{
  "name": "beaker_${cid}",
  "match": "$BUNSEN_MATCH/beaker/${cid}",
  "targets": [
    "${ip}:8801"
  ],
  "options": [
    "timeout server 24h"
  ]
}
EOF
    )
    beakers+=("$stanza")
  fi
done <<<"$(docker ps -q)"

echo [$(join , "${beakers[@]}")] | jq "."
