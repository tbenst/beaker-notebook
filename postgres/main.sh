#!/bin/bash

set -o errexit -o pipefail -o nounset

for i in "$@"; do
  case "$i" in
    --database=*) database="${i#--database=}" ;;
    -h|--help) cat <<EOF
Usage: postgres [options]

Options:
  -h, --help      Display this message and exit.
  --database=<db> Create a database with name db.
EOF
    exit 1
    ;;
  esac
done

if [[ -z $(ls /var/lib/postgresql/9.3/main) ]]; then
  chown postgres:postgres /var/lib/postgresql/9.3/main
  su postgres -c "/usr/lib/postgresql/9.3/bin/initdb /var/lib/postgresql/9.3/main"
fi

if [[ -n ${database+$database} ]]; then
  /etc/init.d/postgresql start
  (set +o pipefail +o errexit; psql -Upostgres -h127.0.0.1 -lqt | awk '{print $1}' | grep -qo "$database") \
    || su postgres -c "createdb -e $database"
  /etc/init.d/postgresql stop
fi

exec su postgres -c "/usr/lib/postgresql/9.3/bin/postgres -D /etc/postgresql/9.3/main"
