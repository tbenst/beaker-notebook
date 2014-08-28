#!/bin/bash
set -o errexit -o nounset -o pipefail

function join { local IFS="$1"; shift; echo "$*"; }

beakers=()

while read -r cid; do
  if [[ `docker inspect --format="{{.Config.Image}}" $cid` == $BEAKER_IMAGE ]]; then
    ip=${BEAKER_HOST-`docker inspect --format="{{.NetworkSettings.IPAddress}}" $cid`}
    port=${BEAKER_PORT-`docker inspect --format='{{range $p, $conf := .NetworkSettings.Ports}}{{(index $conf 0).HostPort}}{{end}}' $cid`}

    stanza=$(cat <<EOF
{
  "name": "beaker_${cid}",
  "match": "$BUNSEN_MATCH/beaker/${cid}",
  "targets": [
    "$ip:$port"
  ]
}
EOF
    )
    beakers+=("$stanza")
  fi
done <<<"$(docker ps -q)"

echo [$(join , "${beakers[@]+${beakers[@]}}")] | jq "."
