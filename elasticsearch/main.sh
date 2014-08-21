#!/bin/bash -e

for i in "$@"
do
case $i in
  -h|--help)
    cat <<EOF

  Usage: app options
  Options:
          -h  --help      Display this message and exit
EOF
    exit
    ;;
esac
done

ES_HOME=/usr/share/elasticsearch
LOG_DIR=/var/log/elasticsearch
WORK_DIR=/tmp/elasticsearch
CONF_DIR=/etc/elasticsearch
CONF_FILE=$CONF_DIR/elasticsearch.yml

mkdir -p "$LOG_DIR" "$WORK_DIR"

DAEMON_OPTS="-Des.default.config=$CONF_FILE -Des.default.path.home=$ES_HOME -Des.default.path.logs=$LOG_DIR -Des.default.path.work=$WORK_DIR -Des.default.path.conf=$CONF_DIR"

exec $ES_HOME/bin/elasticsearch $DAEMON_OPTS
