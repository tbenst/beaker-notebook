SHELL := /usr/bin/env bash

.PHONY: all watch run

all:
	lein deps

# the repl is configured to run `(user/watch)` on startup
watch:
	lein repl :headless

build:
	lein do clean, uberjar

run:
	java \
		-Xmx256M \
		-Dsun.security.jgss.native=true \
		-jar target/provisioner-*-standalone.jar
