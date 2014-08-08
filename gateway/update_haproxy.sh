#!/bin/bash
set -o errexit -o nounset -o pipefail

tmp_config=$(mktemp /tmp/haproxy.XXXXXXXX)
real_config=/var/opt/gateway/applied_haproxy.cfg
haproxy_symlink=/etc/haproxy/haproxy.cfg

cleanup() {
  rm -rf "$tmp_config"
}
trap cleanup EXIT

./generate_haproxy_config.sh > $tmp_config
haproxy -c -f $tmp_config
cp $tmp_config $real_config
ln -sf $real_config $haproxy_symlink
/etc/init.d/haproxy reload
