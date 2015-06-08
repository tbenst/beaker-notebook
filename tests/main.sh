#!/usr/bin/env bash

# export display so firefox knows where to show
# since we are in headless mode
export DISPLAY=:99.0

# start xdisplay
Xvfb :99 -shmem -screen 0 1368x768x16 &

# start window manager
2>/dev/null 1>&2 fluxbox &

# start vnc server
x11vnc -shared -display :99 -bg -nopw -listen 0.0.0.0 -forever -logappend /var/log/x11vnc.log -xkb

# run tests
npm start
