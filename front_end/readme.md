bunsen front end
============

## Optional Compile ENV flags
  * `API_BASE_URL`, defaults to http://window.location.hostname:3000
  * `NODE_ENV`, defaults to undefined
    * If you set this to `test` jquery will be included as a script.

## Dev
  * `npm install`
  * `npm run-script bower`
  * `npm run-script watch`

## Compiling
  * `npm run-script compile`

## Testing
  * `npm run-script test-server`
  * run your integration tests
  * visit `http://localhost:4444/coverage`
