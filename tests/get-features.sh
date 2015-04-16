#!/usr/bin/env bash
set -o nounset

i=0

find features -name "*.feature" | while read fname; do
  BUCKET=$(($i % $CIRCLE_NODE_TOTAL))
  if [[ "$BUCKET" == "$CIRCLE_NODE_INDEX" ]];
  then echo "--feature="$fname
  fi
  ((i++))
done
