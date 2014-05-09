#!/bin/bash -e

for i in "$@"
do
case $i in
  -m|--mount) mount=1 ;;
  -h|--help)
    cat <<EOF

  Usage: beaker [options]
  Options:
          -h  --help      Display this message
          -m  --mount     Mount S3 bucket

EOF
    exit
    ;;
esac
done

sleep 1
cd /home/beaker

[[ $mount -eq 1 ]] && s3fs bunsen-development /var/s3 && unset AWSSECRETACCESSKEY AWSACCESSKEID

exec gradle --project-dir /home/beaker/core/config/builds/dev/ run
