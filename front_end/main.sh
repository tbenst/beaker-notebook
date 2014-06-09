#!/bin/bash -e

api_url="/api"
beaker_url="/beaker"

for i in "$@"
do
case $i in
  -w|--watch) watch=1 ;;
  -t|--test) test=1 ;;
  --api_url=*) api_url="${i#--api_url=}" ;;
  --beaker_url=*) beaker_url="${i#--beaker_url=}" ;;
  -h|--help)
    cat <<EOF

  Usage: web [options]
  Options:
          -h  --help          Display this message
          -w  --watch         Restart server if files change
          -t  --test          Run test server
          --api_url=(url)     Set api URL
          --beaker_url=(url)  Set beaker URL

EOF
    exit
    ;;
esac
done

echo "window.BUNSEN_SERVICES = {api: '$api_url', beaker: '$beaker_url'};" > public/js/config.js

if [[ $watch -eq 1 ]]; then
  PORT=8080 exec roots watch
elif [[ $test -eq 1 ]]; then
  PORT=8080 NODE_ENV=test exec roots watch
elif [[ $shell -eq 1 ]]; then
  exec /bin/bash
else
  exec /usr/sbin/nginx
fi
