#!/usr/bin/env make -f

SHELL := /usr/bin/env bash

TAG ?= latest
REGISTRY ?= mojotech

BUILD_IMAGES := web api riemann datomic tests
DEPLOY_IMAGES := web api riemann datomic

.PHONY: \
	$(BUILD_IMAGES) \
	push-all \
	push-% \
	clean-all \
	clean-% \
	prepare-all \
	prepare-% \
	wait-web \
	wait-api \
	wait-user \
	start-web \
	start-api \
	start-tests \
	test \
	test-% \
	test-all \
	test-integration \
	deploy-% \
	bootstrap-ci \
	bootstrap-local \
	provision-local

all: $(BUILD_IMAGES)

$(BUILD_IMAGES):
	docker build --force-rm -t $(REGISTRY)/bunsen-$@:$(TAG) $@

#
#
#

push-all: $(DEPLOY_IMAGES:%=push-%)
push-%:
	docker push $(REGISTRY)/bunsen-$*:$(TAG)

#
#
#

prepare-all: $(BUILD_IMAGES:%=prepare-%) prepare-beaker

prepare-%:
	make -C $*

prepare-beaker:
	docker pull beakernotebook/beaker-prerelease:master-0-g95b1538

prepare-riemann prepare-datomic:
	true

#
#
#

test test-all: test-api test-integration

test-api: wait-all
	source config/test.env && cd api && lein test

test-integration: wait-all start-tests
	sleep 5
	docker logs -f bunsen-tests
	exit $$(docker wait bunsen-tests)

#
#
#

wait-all: wait-web wait-api

wait-web: start-web
	wget -qO- --retry-connrefused --tries=20 "127.0.0.1:8081"

wait-api: start-api
	wget -qO- --retry-connrefused --tries=20 "127.0.0.1:3000/user/v1/status"
	wget -qO- --retry-connrefused --tries=20 "127.0.0.1:3000/notebook/v1/status"
	wget -qO- --retry-connrefused --tries=20 "127.0.0.1:3000/provisioner/v1/status"
	wget -qO- --retry-connrefused --tries=20 "127.0.0.1:3000/marketplace/v1/status"

#
#
#

start-web:
	docker run -d -p 8081:8081 --env-file="config/test.env" --name=bunsen-web $(REGISTRY)/bunsen-web:$(TAG) $(COMMANDS)

start-api:
	docker run -d -p 3000:3000 --env-file="config/test.env" --name=bunsen-api $(REGISTRY)/bunsen-api:$(TAG) $(COMMANDS)

start-tests:
	docker run -d -p 5900:5900 --env-file="config/test.env" --name=bunsen-tests -e BUNSEN_URI=$(BUNSEN_URI) $(REGISTRY)/bunsen-tests:$(TAG) $(COMMANDS)

#
#
#

deploy-%:
	jq '.apps[].container.docker.image |= "\(.):$(TAG)"' config/$*.json  | bin/marathon --verbose --trace group update -f - /$*

#
#
#

bootstrap-ci:
	script/bootstrap_ci.sh

bootstrap-local:
	script/bootstrap_local.sh

provision-local: export ANSIBLE_HOSTS = ansible/inventory.ini
provision-local:
	ansible-playbook -K ansible/playbooks/local.yml
