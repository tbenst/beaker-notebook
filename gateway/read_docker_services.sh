#!/bin/bash
set -o errexit -o nounset -o pipefail

cat <<EOF
[
  {
    "name": "bunsen_api",
    "match": "$BUNSEN_MATCH/api",
    "targets": [
      "${APP_PORT_3000_TCP_ADDR}:3000"
    ]
  },
  {
    "name": "bunsen_web",
    "match": "$BUNSEN_MATCH/",
    "targets": [
      "${WEB_PORT_8080_TCP_ADDR}:8080"
    ],
    "options": [
      "acl auth_ok_trivial_users http_auth(trivial_users)",
      "http-request auth realm Bunsen if !auth_ok_trivial_users"
    ]
  }
]
EOF
