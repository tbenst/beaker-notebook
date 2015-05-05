Bunsen User service
===========================
###Description
A clojure web service that authenticates users.


###Requirements

- Java
- Leiningen (>= 2.4.x)
- Docker

###Running

To run outside of a docker container, `lein run` will start the server on the default port (3004). To start from the `lein repl` in development, run:

	(user/start)
	;; starts the service

Also in development, the service can be restarted or stopped from the `repl`:

	(user/restart)
	;; restarts the service, reloads modified namespaces
	(user/stop)
	;; stops the service

###Building

All commands should be run in the service directory. To create the uberjar, first run:

	lein build
