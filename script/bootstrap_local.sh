#!/usr/bin/env bash

#
# Bootstrap the local dev environment.
#

install_xcode() {
  printf "checking for xcode..."
  "xcode-select" --print-path 1>/dev/null \
    || sudo "xcode-select" --install
  echo "ok"
}

install_brew() {
  printf "checking for brew..."
   hash brew \
    || ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  echo "ok"
}

install_ansible() {
  printf "checking for ansible..."
  brew ls --versions ansible | grep -q ansible \
    || brew install ansible
  echo "ok"
}

printf "checking for mac..."
if [[  $(uname -s) == Darwin ]]; then
  echo "ok"
  install_xcode
  install_brew
  install_ansible
else
  echo "no"
  exit 1
fi
