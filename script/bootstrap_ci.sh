#!/usr/bin/env bash

#
# Bootstrap the Circle CI environment.
#

reconfigure_docker() {
  # since docker doesn't listen over tcp by default, change config to listen on all interfaces so containers can connect
  echo 'DOCKER_OPTS="-s btrfs -e lxc -H unix:///var/run/docker.sock -H tcp://0.0.0.0:4243"' | sudo tee /etc/default/docker
  sudo service docker restart
}

install_haproxy() {
  sudo add-apt-repository -y ppa:vbernat/haproxy-1.5
  sudo apt-get update
  sudo apt-get install haproxy
}

install_jq() {
  # the version of jq in ubuntu 12.04 is too old and doesn't support --arg, so install the latest
  wget http://stedolan.github.io/jq/download/linux64/jq -O "$HOME/bin/jq" \
    && chmod +x "$HOME/bin/jq"
}

install_elasticsearch() {
  # the version of elasticsearch in ubuntu 12.04 is too old, so install a newer one
  wget https://download.elastic.co/elasticsearch/elasticsearch/elasticsearch-1.3.4.tar.gz \
    && tar -xvf elasticsearch-1.3.4.tar.gz
}

if [[ -n $CIRCLECI ]]; then
  reconfigure_docker
  install_haproxy
  install_jq
  install_elasticsearch
else
  exit 1
fi
