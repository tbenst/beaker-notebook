#!/bin/bash -e

for i in "$@"
do
case $i in
  -m|--migrate) migrate=1 ;;
  -s|--seed) seed=1 ;;
  -i|--index) index=1 ;;
  -w|--watch) watch=1 ;;
  --new-migration=*) new_migration="${i#--new-migration=}" ;;
  --seed-with-file=*) seed_with_file="${i#--seed-with-file=}" ;;
  --delay=*) delay="${i#--delay=}" ;;
  -h|--help)
    cat <<EOF

  Usage: app [options]
  Options:
          -h  --help              Display this message
          --new-migration=(name)  Create a new migration
          -m  --migrate           Run migrations before starting app
          -s  --seed              Seed database with fake data starting app
          -i  --index             Index marketplace datasets in elasticsearch
          --seed-with-file=(file) Seed database with data from specified file starting app
          -w  --watch             Restart server if files change
          --delay=(secs)          Delay start x seconds

EOF
    exit
    ;;
esac
done

# http://serverfault.com/a/502019
color()(set -o pipefail;"$@" 2>&1>&3|sed $'s,.*,\e[31m&\e[m,'>&2)3>&1

cd /var/app
mkdir -p /var/app/node_modules && ln -sf /usr/local/lib/node_modules/knex /var/app/node_modules/knex
# knex assumes we're going to run the executable from local node_modules instead of globally,
# so we have to point to the global knex file for migrations

[[ -z $delay ]] || sleep $delay
[[ -z $new_migration ]] || knex migrate:make $new_migration --knexfile=config.js
[[ -z $seed_with_file ]] || node app_seed.js -f $seed_with_file
[[ $migrate -eq 1 ]] && knex migrate:latest --knexfile=config.js
[[ $seed -eq 1 ]] && node app_seed.js
[[ $index -eq 1 ]] && BULK_INDEX=true node reindex.js

if [[ $watch -eq 1 ]]; then
  color exec pm2 start dev_run.sh -o /dev/stdout -e /dev/stderr --watch --no-daemon -x --silent
else
  exec node app.js
fi
