#!/bin/bash -e

# Clean up running node-inspector pm2 fork processes
kill $(lsof -i :8080 | awk 'FNR==2 {print $2}') && \
kill $(lsof -i :5858 | awk 'FNR==2 {print $2}')

node-debug --hidden='node_modules/' -–no-preload --debug-brk=0 --web-host=0.0.0.0 --cli app.js
