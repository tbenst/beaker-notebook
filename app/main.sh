#!/bin/bash -e

for i in "$@"
do
case $i in
  -m|--migrate) migrate=1 ;;
  -s|--seed) seed=1 ;;
  -w|--watch) watch=1 ;;
  --delay=*) delay="${i#--delay=}" ;;
  --shell) shell=1 ;;
  -h|--help)
    cat <<EOF

  Usage: app [options]
  Options:
          -h  --help      Display this message
          -m  --migrate   Run migrations before starting app
          -s  --seed      Seed database with fake data starting app
          -w  --watch     Restart server if files change
          --delay=(secs)  Delay start x seconds
          --shell         Start interactive shell

EOF
    exit
    ;;
esac
done

# http://serverfault.com/a/502019
color()(set -o pipefail;"$@" 2>&1>&3|sed $'s,.*,\e[31m&\e[m,'>&2)3>&1

cd /var/app

[[ -z $delay ]] || sleep $delay
[[ $migrate -eq 1 ]] && knex migrate:latest -v --environment=${NODE_ENV-development}
[[ $seed -eq 1 ]] && node app_seed.js

if [[ $watch -eq 1 ]]; then
  color exec pm2 start app.js -o /dev/stdout -e /dev/stderr --watch --no-daemon --silent
elif [[ $shell -eq 1 ]]; then
  exec /bin/bash
else
  exec node app.js
fi
