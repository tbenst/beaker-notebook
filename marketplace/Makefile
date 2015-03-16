
.PHONY: all watch run

all:
	lein deps

# the repl is configured to run `(user/watch)` on startup
watch:
	lein repl :headless

# remove the dev profile to run in production mode
run:
	lein with-profile -dev run

seed:
	lein run -m bunsen.marketplace.seeder
	lein run -m bunsen.marketplace.seeder -d resources/index/datasets_0.2.json -c resources/index/categories_0.2.json -i catalog_0.2
