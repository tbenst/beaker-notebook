#!/bin/bash

if [[ -z $SSHED ]]; then
  vagrant ssh -c "SSHED=1 /vagrant/script/attach.sh $1"
else
  PID="$(sudo docker inspect --format '{{.State.Pid}}' $1 2>/dev/null)"

  if [[ -n $PID ]]; then
    sudo nsenter --target "$PID" --mount --uts --ipc --net --pid
  else
    echo "$(tput bold)$(tput setaf 1)Couldn't find that container, are you sure it exists and is running?$(tput sgr0)"
  fi
fi
