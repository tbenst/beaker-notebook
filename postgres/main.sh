#!/bin/bash -e

for i in "$@"
do
case $i in
  --database=*) database="${i#--database=}" ;;
  -c|--create) create=1 ;;
  -f|--force) force=1 ;;
  -r|--run) run=1 ;;
  -h|--help)
    cat <<EOF

  Usage: app options
  Options:
          -h  --help      Display this message and exit.
          -c  --create    Create a new cluster (holds multiple db's).
          -f  --force     Before creating cluster, delete any existing old one
          --database=(db) Create a database with name db.
          -r  --run       Run the postgres server in the foreground.
EOF
    exit
    ;;
esac
done

if [[ $create -eq 1 ]]; then
    chown postgres:postgres /var/lib/postgresql/9.3/main
    if [[ $force -eq 1 ]]; then
      rm -rf /var/lib/postgresql/9.3/main/*
    fi
    su postgres -c "/usr/lib/postgresql/9.3/bin/initdb /var/lib/postgresql/9.3/main"
fi

if [[ $database ]]; then
    /etc/init.d/postgresql start
    echo "createdb $database"
    su postgres -c "createdb $database"
    /etc/init.d/postgresql stop
fi

if [[ $run -eq 1 ]]; then
    exec su postgres -c "/usr/lib/postgresql/9.3/bin/postgres -D /etc/postgresql/9.3/main"
fi
