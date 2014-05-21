#!/bin/bash -e

for i in "$@"
do
case $i in
  --role=*) role="${i#--role=}" ;;
  --mount=*) mount="${i#--mount=}" ;;
  --bucket=*) bucket="${i#--bucket=}" ;;
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

cd /home/beaker

if [[ ! -z $bucket ]] && [[ ! -z $mount ]]; then
  # Make fuse device node if it doesn't exist. This line requires --priviliged.
  [[ -f /dev/fuse ]] || mknod -m 666 /dev/fuse c 10 229

  # Create mount point if it doesn't exist.
  [[ -f "$mount" ]] || mkdir -p "$mount"

  # Use an IAM role if provided, otherwise get credentials from the environment.
  if [[ ! -z $role ]]; then
    s3fs="s3fs -o iam_role=$role"
  else
    s3fs="s3fs"
  fi

  "$s3fs" "$bucket" "$mount"

  unset AWSACCESSKEID AWSSECRETACCESSKEY
fi

exec gradle --project-dir /home/beaker/core/config/builds/dev/ run
