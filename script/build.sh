#!/usr/bin/env bash
set -o errexit -o pipefail -o nounset

ENVIRONMENT=${ENVIRONMENT-development}
image_args=()

while [[ $# > 0 ]]; do
  case $1 in
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

if [[ ${#image_args[@]} > 0 ]]; then
  images=("${image_args[@]}")
else
  IFS=$'\n'
  images=($(cat $config_file | jq -r "keys[]"))
  unset IFS
fi

for image in "${images[@]}"; do
  echo ""
  echo building $image
  echo ""

  build_directory="$(cat $config_file | jq -r ".$image.build")"

  if [[ $build_directory == 'null' ]]; then
    build_directory=$image
  fi

  docker build --rm --force-rm -t $image $build_directory
done
