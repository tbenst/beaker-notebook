
SHELL := /usr/bin/env bash

.PHONY: all watch seed index migrate run

all:
	npm install

watch:
	node_modules/.bin/nodemon --exec 'node_modules/.bin/node-debug --hidden=node_modules -–no-preload --debug-brk=0 --cli' app.js

seed:
	node app_seed.js $(if $(FILE),-f $(FILE))

index:
	BULK_INDEX=true node reindex.js

migrate:
	node_modules/.bin/knex migrate:latest --knexfile=config.js

run:
	node app.js
