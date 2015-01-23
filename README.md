# Bunsen - Big data for fun and profit.


## How to contribute

[Setting up your environment](docs/setting-up-your-environment.md)

[Quick start guide to local development](docs/local_quickstart.md)


## Microservices

Bunsen utilizes
[Microservices](http://martinfowler.com/articles/microservices.html).

This makes some things simpler, and other things more complicated.

[Here](docs/services/index.md) is a page that enumerates all of the services that comprise Bunsen, and
describes each of them and how they interrelate.


## Environments

Bunsen runs in a variety of places, with different configurations and sets of
involved services.

* development (usually on your workstation)
* test (usually on your workstation)
* ci (usually on mojo-cloud)
* [staging](environments/staging.md) (on mojo-cloud)

The configuration for each environment is located in the "config" directory.
The Makefile relies on the appropriate configuration file when running
tasks.


