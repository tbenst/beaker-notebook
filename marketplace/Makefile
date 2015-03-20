SHELL := /usr/bin/env bash

.PHONY: all watch run test

all:
	lein deps

# the repl is configured to run `(user/watch)` on startup
watch:
	lein repl :headless

build:
	lein do clean, uberjar

seed:
	lein run -m bunsen.marketplace.seeder
	lein run -m bunsen.marketplace.seeder -d resources/index/datasets_0.2.json -c resources/index/categories_0.2.json -i catalog_0.2

test:
	lein with-profiles -dev test bunsen.marketplace.test.cookie

run:
	java \
		-Xmx256M \
		-Dsun.security.jgss.native=true \
		-jar target/marketplace-*-standalone.jar
