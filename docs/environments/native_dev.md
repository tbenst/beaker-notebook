# Bunsen Native Development

This is the way you'll usually be running Bunsen locally while you're developing
features.  In this environment, [Forego](https://github.com/ddollar/forego) runs
and manages most of the services using native processes.

The disadvantage of doing it this way, as opposed to running the services in
Docker, is that development environment less closely resembles Staging and CI,
which makes it more likely that problems will occur in those other environments
that will be invisible in Native-Dev.

The advantage is that you'll be able to see the results of your functional
changes more quickly using native processes, and will be able to make faster
progress on features that don't depend on running in Docker (which is most
features).


## Setup

To set up the Native Development environment:

    # bootstrapping makes sure brew and ansible are installed
    make bootstrap-local

    # stop your vagrant box, and quit virtualbox, because the next step updates it
    vagrant halt

    # install this in advance, because it doesn't get installed properly by the next script
    brew install forego

    # install and update local "global" dependencies, including java, vagrant, virtualbox, docker, etc.
    ansible-playbook -K -i ansible/inventory.ini ansible/playbooks/local.yml

    # enable and update postgres and elastic search
    ansible-playbook -i ansible/inventory.ini ansible/playbooks/local_services.yml

    # install all the service dependencies (this will run npm install, gradle build, etc)
    make prepare-all

    # copy over dev.env so you can have some local config
    cp config/dev.env .env

    # forego is a go version of foreman, use it to start the app
    forego start

## Managing System-level services

Bunsen uses postgres and elasticsearch. To make managing theses services easier, there are some ansible playbooks to enable/start/stop/restart them.

    # to restart local services, use the local_services playbook and set state to restarted
    ansible-playbook -e state=restarted -i ansible/inventory.ini ansible/playbooks/local_services.yml

    # to ensure vagrant services are running, use the vagrant_services.yml playbook, and set state to started
    ansible-playbook -e state=started -i ansible/inventory.ini ansible/playbooks/vagrant_services.yml

    # to limit to a subset of services, pass a more complicated set of variables including a services array
    ansible-playbook -e '{"state":"restarted", "services":["postgresql"]}' -i ansible/inventory.ini ansible/playbooks/vagrant_services.yml

### Postgres tasks

    # the database was installed above, but we need to create the dev db
    createdb bunsen_dev

    # running migrations (or any task)
    forego run make -C app migrate

    # creating a migration
    forego run make -C app new-migration name="migration_name"

    # seeding
    forego run make -C app seed


### Elasticsearch

    # elasticsearch was installed above, but we need to seed it with marketplace data
    forego run make -C marketplace seed

    # the seeder accepts a few options
    # -h --help       - Print options
    # -d --datasets   - Datasets file location
    # -c --categories - Categories file location
    # -i --index-name - Index name


    # want to add your own dataset?
    forego run make -C marketplace seed -d /path/to/your/json/file.json

    # you've added your own dataset, but you want a different index name?
    forego run make -C marketplace seed -d /path/to/your/json/file.json -i index_name

    # how about adding your own categories?
    forego run make -C marketplace seed -c /path/to/your/json/file.json


## Tests

Running integration tests: (WARNING:  this will blow away your development
Postgres database):

To run all tests:

    forego run make -C tests run

To run only specific scenario (maybe just the 1 you are working on), first add
the @failed tag above the scenario or feature you want to run, then

    cd tests/
    export HOST=127.0.0.1:9000
    npm run-script failures


## Gotchas

* You must point your browser to the the host and port defined in HOSTNAME in
  your .env file.  You CANNOT use "localhost" unless that matches the HOSTNAME.
  If you do, some parts of Bunsen will likely work, but CORS will prevent
  other things from working, when Bunsen attempts to load Ajax requests
  and Websockets connections from the host you have defined in HOSTNAME.

