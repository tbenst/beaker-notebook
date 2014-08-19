#!/bin/bash
set -o errexit -o nounset -o pipefail

for i in "$@"; do
  case $i in
    -h|--help)
      cat <<EOF

Usage: generate_haproxy_config.sh [services_dir=/etc/gateway/routes.d/]

services_dir should indicate a directory containing one or more json files.
Each json file should describe one or more bunsen service, including all
route matching information, network location, and other parameters.

generate_haproxy_config.sh will incorporate all of the service descriptors into
a single haproxy configuration, which it will print to STDOUT.
EOF
    exit
    ;;
  esac
done

services_dir=${1-/etc/gateway/routes.d/}

if [[ ! -d $services_dir ]]; then
  cat <<EOF
You need to specify a services descriptor directory.
Try --help for details.
EOF
  exit 1
fi

_json_atom() { echo "$1" | jq -c -r ".$2 // empty"; }
_json_array() {
  while read -r a && [[ -n $a ]]; do
    echo "$a"
  done <<< "$(echo "$1" | jq -c -r ".$2 // empty | .[]")"
}

get_name() { _json_atom "$1" "name"; }
get_match() { _json_atom "$1" "match"; }
get_method() { _json_atom "$1" "method"; }
get_host() {
  local match=$(get_match "$1")
  local host_with_port=${match%%/*}
  echo ${host_with_port%:*}
}
get_path() {
  local match=$(get_match "$1")
  echo /${match#*/}
}
get_targets() { _json_array "$1" "targets"; }
get_options() { _json_array "$1" "options"; }

write_header() {
  cat <<EOF
# -*- mode: haproxy -*-
# vi: set ft=haproxy :

EOF
}

write_userlist() {
  cat <<EOF
userlist trivial_users
  user u insecure-password p

EOF
}

write_global() {
  cat <<EOF
global
  log /dev/log    local0
  log /dev/log    local1 notice
  chroot /var/lib/haproxy
  user haproxy
  group haproxy
  daemon

EOF
}

write_defaults() {
  cat <<EOF
defaults
  log     global
  mode    http
  option  httplog
  option  dontlognull
  option  redispatch
  option  http-server-close
  retries 3
  maxconn 2000
  timeout connect 5s
  timeout client 30s
  timeout client-fin 30s
  timeout server 30s
  timeout tunnel  24h

EOF
}

write_frontend() {
  echo "frontend f_80"
  echo "  bind *:80"

  for e in "${services[@]}"; do
    local acls=""
    local name=$(get_name "$e")

    local host=$(get_host "$e")
    if [[ -n $host ]]; then
      acls+="${acls+ }{ hdr_dom(host) -i $host }"
    fi

    local path=$(get_path "$e")
    if [[ -n $path ]] && [[ $path != / ]]; then
      acls+="${acls+ }{ path_beg -i $path }"
    fi

    local method=$(get_method "$e")
    if [[ -n $method ]]; then
      acls+="${acls+ }{ method $method }"
    fi

    echo "  use_backend b_$name ${acls+ if $acls}"
  done
}

write_backends() {
  for e in "${services[@]}"; do
    [[ -z "$e" ]] && continue

    local name=$(get_name "$e")
    local targets=$(get_targets "$e")
    local options=$(get_options "$e")

    echo ""
    echo "backend b_${name}"
    echo "  balance roundrobin"

    for target in "${targets[@]}"; do
      echo "  server s $target"
    done
    for option in "${options[@]}"; do
      echo "  $option"
    done
  done
}

read_services() {
  services=()
  while read -r e; do
    services+=("$e")
  done <<<"$(cat $services_dir/*.json | jq '.[]' | jq -c -r -s 'sort_by(.match | length) | reverse | .[]')"
}

read_services
write_header
write_userlist
write_global
write_defaults
write_frontend
write_backends
