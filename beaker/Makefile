
SHELL := /usr/bin/env bash

.PHONY: all watch run build

all: env
	env/bin/pip install -r requirements.txt
	cd beaker-notebook && gradle build

# isolate python packages inside a virtualenv
env:
	virtualenv env --system-site-packages

# TODO: add a filewatcher for beaker?
watch: run

# calling core/beaker.command directly doesn't work inside a virtual env, so call bin/core directly
run:
	source env/bin/activate && cd beaker-notebook/core && ./build/install/core/bin/core --open-browser=false

# generate a cookie file to secure beaker at runtime
cookie:
	touch /etc/nginx/cookies/$(BEAKER_COOKIE)

