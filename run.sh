#!/usr/bin/env bash
set -o errtrace -o pipefail -o nounset

get_config() {
  echo "$(cat $config_file | jq -r ".$1.$2" 2>/dev/null)"
}

get_container_status() {
  case "$(docker inspect --format '{{.State.Running}}' $1 2>/dev/null)" in
    true) echo running;;
    false) echo stopped;;
    *) echo nonexistent;;
  esac
}

docker_run_or_start() {
  local image_name="$1"
  local container_name="$env_prefix$image_name"
  local container_status="$( get_container_status $container_name )"

  case $container_status in
    running)
      docker restart $container_name
    ;;
    stopped)
      docker start $container_name
    ;;
    nonexistent)
      local ports="$( get_config $image_name "ports" )"
      local volumes="$( get_config $image_name "volumes[]" )"
      local links="$( get_config $image_name "links[]" )"
      local env_vars="$( get_config $image_name "environment[]" )"
      local image_command="$( get_config $image_name "command" )"
      local volume_args=''
      local link_args=''
      local env_args=''
      local run_options=''

      for volume in $volumes; do
        volume_args="$volume_args -v $volume"
      done

      for link in $links; do
        link_args="$link_args --link $env_prefix$link:$link"
      done

      for env_var in $env_vars; do
        env_args="$env_args -e $env_var"
      done

      if [[ $image_command == 'null' ]]; then
        image_command=''
      fi

      docker run -d --name=$container_name -p $ports $env_args $volume_args $link_args $image_name $image_command -r
    ;;
  esac
}

ENVIRONMENT=${ENVIRONMENT-development}
image_args=()
env_prefix=''

while [[ $# > 0 ]]; do
  case $1 in
    -t|--test|--tests)
      ENVIRONMENT='test'
    ;;
    --env=*)
      ENVIRONMENT="${1#--env=}"
    ;;
    *)
      image_args=("$@")
      break
    ;;
  esac

  shift
done

config_file="config/$ENVIRONMENT.json"

if [[ $ENVIRONMENT != 'development' ]]; then
  env_prefix="$ENVIRONMENT."
fi

if [[ ${#image_args[@]} > 0 ]]; then
  images=("${image_args[@]}")
else
  IFS=$'\n'
  images=($( cat $config_file | jq -r "keys[]" ))
  unset IFS
fi

while [[ ${#images[@]} > 0 ]]; do
  # if the container's links aren't running,
  # move the container to the end of the queue
  links="$( get_config ${images[0]} "links[]" )"
  for link in $links; do
    link_status="$( get_container_status $env_prefix$link )"
    if [[ $link_status != 'running' ]]; then
      images[${#images[@]}]=${images[0]}
      images=("${images[@]:1}")
      continue 2
    fi
  done

  docker_run_or_start ${images[0]}
  images=("${images[@]:1}")
done
