Bunsen API Server
==========

### (NOTICE: In order to run these commands in the docker containers, run bash inside the running container: `docker exec -it app bash`)

## Dev

* `npm install`
* if this is the first time you are running the server you will need to create a new database
  - `createdb bunsenDevelopment`
* `cp config.js.sample config.js`
* run your migrations via `npm run-script migrate`
* to seed the database `npm run-script seed`
* `npm start`

### Generating new migrations

* (this can be run outside of the container) `docker run -v /vagrant/app:/var/app app --new-migration=migration_name`

### Reseed database
This task will drop the development DB, recreate it, run migrations, and then reseed the data.


* `docker run -e NODE_ENV=development -e CIPHER_KEY=Auj/QL_WU[xX64p+1TB81m6AD6wSCl -v /vagrant/app:/var/app --link db:db --link provisioner:provisioner --link elasticsearch:elasticsearch app --migrate --seed`

## Migrate per ENV

It is quite simple to change your migration
target via the NODE_ENV variable.

* `docker run -e NODE_ENV=development -e CIPHER_KEY=Auj/QL_WU[xX64p+1TB81m6AD6wSCl -v /vagrant/app:/var/app --link db:db --link provisioner:provisioner --link elasticsearch:elasticsearch app --migrate`

* `docker run -e NODE_ENV=test -e CIPHER_KEY=Auj/QL_WU[xX64p+1TB81m6AD6wSCl -v /vagrant/app:/var/app --link db:db --link provisioner:provisioner --link elasticsearch:elasticsearch app --migrate`
