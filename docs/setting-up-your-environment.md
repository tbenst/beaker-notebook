# Bunsen Local Dev

## Setup

To setup the new bunsen dev environment:

    # bootstrapping makes sure brew and ansible are installed
    make bootstrap-local

    # stop your vagrant box, and quit virtualbox, because the next step updates it
    vagrant halt

    # install this in advance, because it doesn't get installed properly by the next script
    brew install forego

    # install and update local "global" dependencies, including java, vagrant, virtualbox, docker, etc.
    ansible-playbook -K -i ansible/inventory.ini ansible/playbooks/local.yml

    # install all the service dependencies (this will run npm install, gradle build, etc)
    make prepare-all

    # copy over dev.env so you can have some local config
    cp config/dev.env .env

    # forego is a go version of foreman, use it to start the app
    forego start

## Database

    # the database was installed above, but we need to create the dev db
    createdb bunsen_dev

    # running migrations (or any task)
    forego run make -C app migrate

    # seeding
    forego run make -C app seed

Bunsen uses postgres and elasticsearch. To make managing theses services easier, there are some ansible playbooks to enable/start/stop/restart them.

    # to restart local services, use the local_services playbook and set state to restarted
    ansible-playbook -e state=restarted -i ansible/inventory.ini ansible/playbooks/local_services.yml

    # to ensure vagrant services are running, use the vagrant_services.yml playbook, and set state to started
    ansible-playbook -e state=started -i ansible/inventory.ini ansible/playbooks/vagrant_services.yml

    # to limit to a subset of services, pass a more complicated set of variables including a services array
    ansible-playbook -e '{"state":"restarted", "services":["postgresql"]}' -i ansible/inventory.ini ansible/playbooks/vagrant_services.yml

## Tests

Tests can be run locally, or within the vagrant box using docker containers. Using docker is preferred, especially when troubleshooting CI issues.

    # make sure vagrant is running
    vagrant up

    # build all docker images
    make

    # actually run the tests
    make test

