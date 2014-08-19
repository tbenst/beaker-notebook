#!/bin/bash
set -o nounset -o pipefail

while :; do
  sleep 10
  ./read_docker_services.sh > /etc/gateway/routes.d/docker_services.json
  ./read_docker_beakers.sh > /etc/gateway/routes.d/docker_beakers.json
  ./update_haproxy.sh
done
