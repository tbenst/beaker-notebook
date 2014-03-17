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

## Reseed database
This task will drop the development DB, recreate it, run migrations, and then reseed the data.

* `npm run-script reseed`
