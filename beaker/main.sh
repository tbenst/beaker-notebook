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
          -h  --help        Display this message
          --mount           Mount S3 bucket
          --role=ROLE       Use IAM role for credentials
          --mount=MOUNT     Mount S3 bucket at MOUNT
          --bucket=BUCKET   Name of S3 bucket to mount

EOF
    exit
    ;;
esac
done

cd /home/beaker

if [[ ! -z $bucket ]] && [[ ! -z $mount ]]; then
  # Make fuse device node if it doesn't exist. This line requires --priviliged.
  [[ -c /dev/fuse ]] || mknod -m 666 /dev/fuse c 10 229

  # Create mount point if it doesn't exist.
  [[ -f "$mount" ]] || mkdir -p "$mount"

  # Use an IAM role if provided, otherwise get credentials from the environment.
  if [[ ! -z $role ]]; then
    opts="-o iam_role=$role"
  fi

  chown beaker:beaker $mount
  su -m beaker -c "/usr/local/bin/s3fs $opts $bucket $mount"

  unset AWSACCESSKEYID AWSSECRETACCESSKEY
fi

htpasswd -bc /etc/nginx/.htpasswd beaker $BEAKER_PASSWORD

exec su -m beaker -c "./core/beaker.command"
