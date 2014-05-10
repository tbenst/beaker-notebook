#!/bin/bash -e

for i in "$@"
do
case $i in
  -w|--watch) watch=1 ;;
  -h|--help)
    cat <<EOF

  Usage: web [options]
  Options:
          -h  --help      Display this message
          -w  --watch     Restart server if files change

EOF
    exit
    ;;
esac
done

if [[ $watch -eq 1 ]]; then
  PORT=8080 exec roots watch
else
  exec /usr/sbin/nginx
fi
