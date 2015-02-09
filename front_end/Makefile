
SHELL := /usr/bin/env bash
CONFIG := nginx.conf

.PHONY: all watch instrument run compile

all:
	npm install
	node_modules/.bin/bower install --allow-root

watch:
	PORT=8081 node_modules/.bin/roots watch --no-open

# *destructively* instrument the javascript to generate the istanbul coverage report
instrument:
	node_modules/.bin/istanbul instrument --embed-source -o public/js/main.js.tmp public/js/main.js
	mv public/js/main.js.tmp public/js/main.js

compile:
	node_modules/.bin/roots compile --no-compress && chmod -R 755 public

# it's convinent to allow relative paths for the NGINX_ROOT, but nginx requires an absolute path
run: export NGINX_ROOT := $(realpath $(NGINX_ROOT))
run:
	nginx -p . -c $(CONFIG)
