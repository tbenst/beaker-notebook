#!/bin/bash -e

for i in "$@"
do
case $i in
  -m|--migrate) migrate=1 ;;
  -s|--seed) seed=1 ;;
  -h|--help)
    cat <<EOF

  Usage: app [options]
  Options:
          -h  --help      Display this message
          -m  --migrate   Run migrations before starting app
          -s  --seed      Seed database with fake data starting app

EOF
    exit
    ;;
esac
done

sleep 1
cd /var/app

[[ $migrate -eq 1 ]] && knex migrate:latest -v --environment=${NODE_ENV-development}
[[ $seed -eq 1 ]] && node app_seed.js

exec node app.js
