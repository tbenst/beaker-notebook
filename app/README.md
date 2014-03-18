Bunsen API Server
==========

## Dev
* `npm install`
* if this is the first time you are running the server you will need to create a new database
  - `createdb bunsenDevelopment`
* `cp config/config.json.sample config/config.json`
* run your migrations via `npm run-script migrate`
* to seed the database `npm run-script seed`
* `npm start`

### Problems migrating / seeding ?
The reality is, sometimes things go very wrong with your database. Here are some steps to recover from a place that you might find yourself in.

* `dropDB "bunsenDevelopment"`
* `createDB "bunsenDevelopment"`
* `npm run-script migrate`
* `npm run-script seed`
* take a deep breath

## Reseed database
This task will drop the development DB, recreate it, run migrations, and then reseed the data.

* `npm run-script reseed`
