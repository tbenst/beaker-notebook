SHELL := /usr/bin/env bash

.PHONY: all watch run test

all:
	lein do clean, uberjar

# the repl is configured to run `(user/watch)` on startup
watch:
	lein repl :headless

seed:
	lein run -m bunsen.marketplace.seeder
	lein run -m bunsen.marketplace.seeder -d resources/seed/datasets_0.2.json -c resources/seed/categories_0.2.json -i catalog_0.2

test:
	lein with-profiles -dev test bunsen.marketplace.test.auth-check bunsen.marketplace.test.api-test

run:
	java \
		-Xmx256M \
		-Dsun.security.jgss.native=true \
		-jar $(wildcard target/marketplace-*-standalone.jar)
