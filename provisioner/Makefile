
.PHONY: all watch run

all:
	lein deps

# the repl is configured to run `(user/watch)` on startup
watch:
	lein repl :headless

# remove the dev profile to run in production mode
run:
	lein with-profile -dev run
