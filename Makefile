#!/usr/bin/env make -f

SHELL := /usr/bin/env bash

TAG := latest
HOST := bunsen-dev
CONFIG := config/dev.jq

IMAGES := postgres elasticsearch web api provisioner beaker tests riemann

PACKAGES := lxc-docker zookeeper mesos marathon haproxy bamboo
SERVICES := docker zookeeper mesos-master mesos-slave marathon haproxy bamboo

TIMEOUT := 1200

BAMBOO_HOST := 10.10.10.10:8000
MARATHON_HOST := 10.10.10.10:8080

POSTGRES_PORT := 5432
ELASTICSEARCH_PORT := 9200
PROVISIONER_PORT := 3001
VNC_PORT := 5900
RIEMANN_PORT := 5556

bamboo := ./bin/bamboo -H $(BAMBOO_HOST)
marathon := ./bin/marathon -H $(MARATHON_HOST)

config := '$(shell \
	jq -r -c -n -f $(CONFIG) \
		--arg HOST "$(HOST)" \
		--arg TAG "$(TAG)" \
		--arg VNC_PORT "$(VNC_PORT)" \
		--arg POSTGRES_PORT "$(POSTGRES_PORT)" \
		--arg ELASTICSEARCH_PORT "$(ELASTICSEARCH_PORT)" \
		--arg PROVISIONER_PORT "$(PROVISIONER_PORT)" \
		--arg RIEMANN_PORT "$(RIEMANN_PORT)")'

.PHONY: \
	$(IMAGES) \
	start \
	stop \
	wire \
	unwire \
	config \
	clean \
	clean-% \
	clean-dangling \
	clean-all \
	kick \
	version \
	status \
	run-%

all: $(IMAGES)

$(filter-out web api,$(IMAGES)):
	@echo 'BUILDING $@ >>>'
	@docker build --force-rm -t $@ $@

web:
	@echo 'BUILDING $@ >>>'
	@docker build --force-rm -t web front_end

api:
	@echo 'BUILDING $@ >>>'
	@docker build --force-rm -t api app

start:
	@echo 'STARTING $(HOST) >>>'
	@jq -c -r '.group' <<<$(config) \
		| $(marathon) group update -c - "$(shell jq -r '.group.id' <<<$(config))" \
		| jq -r '.deploymentId' \
		| xargs -n1 $(marathon) deployment wait -t $(TIMEOUT)

stop:
	@echo 'STOPPING $(HOST) >>>'
	@jq -r '.group.id' <<<$(config) \
		| xargs -n1 $(marathon) group delete -f \
		| jq -r '.deploymentId' \
		| xargs -n1 $(marathon) deployment wait -t $(TIMEOUT)

wire:
	@echo 'WIRING $(HOST) >>>'
	@jq -r -c '.services[]' <<<$(config) \
		| while read -r s; do \
		$(bamboo) service update -c - "$$(jq -r '.id' <<<"$$s")" <<<"$$s"; done

unwire:
	@echo 'UNWIRING $(HOST) >>>'
	@$(bamboo) state \
		| jq -r -c '.Services[] | select(.Id | contains("$(HOST)")) | .Id' \
		| xargs -n1 $(bamboo) service delete

run-%:
	@echo 'RUNNING $(HOST) $* >>>'
	@jq '.jobs[] | select(.id | contains("$*")) | ((.ports // [])[] | "--publish=\(.)"), (.env | to_entries[] | "--env=\(.key)=\(.value)"), .container.image, (.args // [])[]' <<<$(config) \
		| xargs docker run --rm -t --add-host=$(HOST):172.17.42.1 --name="$*$(BUILD_NUMBER)"

config:
	@jq -n $(config) | jq '.'

clean-all: clean clean-dangling

clean: $(IMAGES:%=clean-%)

clean-dangling:
	@echo 'STOPPING DANGLING CONTAINERS >>>'
	@docker ps \
		| awk 'NR>1 && $$2 !~ /:/{print $$1}' \
		| xargs -n1 docker stop
	@echo 'REMOVING DANGLING CONTAINERS >>>'
	@docker ps -a \
		| awk 'NR>1 && $$2 !~ /:/{print $$1}' \
		| xargs -n1 docker rm
	@echo 'REMOVING DANGLING IMAGES >>>'
	@docker images -f dangling=true -q \
		| xargs -n1 docker rmi

clean-%:
	@echo 'STOPPING $* CONTAINERS >>>'
	@docker ps \
		| awk 'NR>1 && $$2 ~ /$*/{print $$1}' \
		| xargs -n1 docker stop
	@echo 'REMOVING $* CONTAINERS >>>'
	@docker ps -a \
		| awk 'NR>1 && $$2 ~ /$*/{print $$1}' \
		| xargs -n1 docker rm
	@echo 'REMOVING $* IMAGES >>>'
	@docker images \
		| awk -v i="$*" 'NR>1 && $$1 == i{print $$3}' \
		| xargs -n1 docker rmi

version:
	@echo 'HOST PACKAGES >>>'
	@(hash jq 2>/dev/null && jq --version | awk -F'-' '{print $$2}' || echo missing!) \
		| xargs printf '  %-16s %s\n' jq:
	@(hash docker 2>/dev/null && docker --version | awk -F' |,' '{print $$3}' || echo missing!) \
		| xargs printf '  %-16s %s\n' docker:
	@for s in ansible vagrant; do \
		(hash $$s 2>/dev/null && $$s --version | awk '{print $$2}' || echo missing!) \
			| xargs printf '  %-16s %s\n' $$s:; \
	done
	@echo
	@echo 'GUEST PACKAGES >>>'
	@vagrant ssh -c \
		"for s in $(PACKAGES); do \
			dpkg -l | awk -v p=\$$s '\$$2==p{print \$$3}' | xargs printf '  %-16s %s\n' \$$s: ; \
		done" \
		2>/dev/null

status:
	@echo 'HOST SERVICES >>>'
	@(vagrant status | grep -q running && echo active || echo stopped) \
		| xargs printf '  %-16s %s\n' vagrant:
	@echo
	@echo 'GUEST SERVICES >>>'
	@vagrant ssh -c \
		"for s in $(SERVICES); do \
			sudo systemctl show \$$s | awk -F= '\$$1 == \"ActiveState\"{print \$$2}' | xargs printf '  %-16s %s\n' \$$s: ; \
		done" \
		2>/dev/null

kick:
	@echo 'KICKING SERVICES >>>'
	@vagrant ssh -c \
		"for s in $(SERVICES); do sudo systemctl restart \$$s; echo '  restarted' \$$s; done" \
		2>/dev/null
