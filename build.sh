#!/usr/bin/env bash
set -o errexit -o pipefail -o nounset

config_file="config/development.json"
image_args=("$@")

if [[ ${#image_args[@]} > 0 ]]; then
  images=("${image_args[@]}")
else
  IFS=$'\n'
  images=($(cat $config_file | jq -r "keys[]"))
  unset IFS
fi

for image in "${images[@]}"; do
  build_directory="$(cat $config_file | jq -r ".$image.build")"

  if [[ $build_directory == 'null' ]]; then
    build_directory=$image
  fi

  docker build --rm --force-rm -t $image $build_directory
done
