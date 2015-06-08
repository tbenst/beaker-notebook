
CONFIG := haproxy.cfg

.PHONY: run

run: export WEB_SERVER ?= 127.0.0.1:8081
run: export API_SERVER ?= 127.0.0.1:3000
run: export RIEMANN_SERVER ?= 127.0.0.1:5556
run: export BEAKER_SERVER ?= 10.10.10.10:8801
run:
	haproxy -db -f $(CONFIG)
