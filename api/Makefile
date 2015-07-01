
.PHONY: all watch seed run

all:
	lein deps

watch:
	lein repl :headless

seed:
	lein run -m bunsen.marketplace.cli.seed
	lein run -m bunsen.marketplace.cli.seed -d resources/marketplace/seed/datasets_0.2.json -c resources/marketplace/seed/categories_0.2.json -i quandl
	lein run -m bunsen.marketplace.cli.seed -m marketplace/two_sigma/mappings.json -d resources/marketplace/seed/datasets_0.3.json -c resources/marketplace/seed/categories_0.3.json -i two_sigma

run:
	java $(JAVA_OPTS) -jar target/api-standalone.jar
