#!/usr/bin/env make -f

SHELL := /usr/bin/env bash

TAG ?= latest
REGISTRY ?= mojotech
ENV ?= dev
HOST ?= localhost

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
	wait-provisioner \
	wait-marketplace \
	wait-notebook \
	wait-user \
	start-web \
	start-provisioner \
	start-marketplace \
	start-notebook \
	start-user \
	start-riemann \
	start-tests-user \
	start-tests-integration \
	start-tests-marketplace \
	start-beaker \
	test-% \
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

test-%: ENV := test

test-api: wait-all
	source config/$(ENV).env && cd api && lein test

test-integration: wait-all start-tests
	sleep 5
	docker logs -f bunsen-tests
	exit $$(docker wait bunsen-tests)

#
#
#

wait-all: wait-web wait-api

wait-web: start-web
	wget -qO- --retry-connrefused --tries=20 "$(HOST):8081"

wait-api: start-api
	wget -qO- --retry-connrefused --tries=20 "$(HOST):3000/user/v1/status"
	wget -qO- --retry-connrefused --tries=20 "$(HOST):3000/notebook/v1/status"
	wget -qO- --retry-connrefused --tries=20 "$(HOST):3000/provisioner/v1/status"
	wget -qO- --retry-connrefused --tries=20 "$(HOST):3000/marketplace/v1/status"

#
#
#

start-web:
	docker run -d -p 8081:8081 --env-file="config/$(ENV).env" --name=bunsen-web $(REGISTRY)/bunsen-web:$(TAG) $(COMMANDS)

start-api:
	docker run -d -p 3000:3000 --env-file="config/$(ENV).env" --name=bunsen-api $(REGISTRY)/bunsen-api:$(TAG) $(COMMANDS)

start-tests:
	docker run -d -p 5900:5900 --env-file="config/$(ENV).env" --name=bunsen-tests -e "CIRCLE_NODE_TOTAL=$(CIRCLE_NODE_TOTAL)" -e "CIRCLE_NODE_INDEX=$(CIRCLE_NODE_INDEX)" $(REGISTRY)/bunsen-tests:$(TAG) $(COMMANDS)

#
#
#

define tag_images
	.
	| .apps[].container.docker.image |= "\(.):$(TAG)"
	| .apps |= map(if .id | contains("provisioner")
									then (.
												| .env.APP_DEFAULTS |= tojson
											)
									else .
								end)
endef

deploy-%: export tag_images := $(tag_images)
deploy-%:
	jq "$$tag_images" config/$*.json  | bin/marathon --verbose --trace group update -f - /$*

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
