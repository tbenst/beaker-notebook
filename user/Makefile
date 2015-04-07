SHELL := /usr/bin/env bash

.PHONY: all watch run

all:
	lein do clean, uberjar

# the repl is configured to run `(user/watch)` on startup
watch:
	lein repl :headless

run:
	java \
		-Xmx256M \
		-Dsun.security.jgss.native=true \
		-jar $(wildcard target/user-*-standalone.jar)
