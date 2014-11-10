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

* `npm run-script reseed`

## Migrate per ENV

It is quite simple to change your migration
target via the NODE_ENV variable.

* `NODE_ENV="test" npm run-script migrate`
* `NODE_ENV="development" npm run-script migrate`

### Problems migrating / seeding ?
The reality is, sometimes things go very wrong with your database. Here are some steps to recover from a place that you might find yourself in.

* `dropdb "bunsenDevelopment"`
* `createdb "bunsenDevelopment"`
* `npm run-script migrate`
* `npm run-script seed`
* take a deep breath
