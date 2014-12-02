#!/bin/bash -e

function main {
  local temp=""
  local help=\
"Usage: web [options]

Options:
  -h,  --help          Display this message
  -w,  --watch         Restart server if files change
  -c,  --coverage      Instrument javascript files for coverage report"

  for i in "$@"; do
    case $i in
      -h|--help) echo "$help"; exit 1 ;;
      -w|--watch) ENABLE_WATCH=y ;;
      -c|--coverage) ENABLE_COVERAGE=y ;;
    esac
    shift
  done

  if [[ -n $ENABLE_COVERAGE ]]; then
    istanbul instrument --embed-source -o public/js/main.js.tmp public/js/main.js
    mv public/js/main.js{.tmp,}
  fi

  if [[ -n $ENABLE_WATCH ]]; then
    PORT=8080 exec roots watch
  else
    exec /usr/sbin/nginx
  fi
}

main "$@"
