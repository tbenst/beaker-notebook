Bunsen API Server
==========

## Dev
* `npm install`
* if this is the first time you are running the server you will need to create a new database
  - `createdb bunsenDevelopment`
* `cp config/config.json.sample config/config.json`
* run your migrations via `npm run-script migrate`
* `node seed.js` to seed the database
* `node app.js`
