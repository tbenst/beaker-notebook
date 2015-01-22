bunsen
======

## Big data for fun and profit.

## [Setting up your environment](docs/setting-up-your-environment.md)



## Understanding How we Use ElasticSearch

#### [Read All about it](docs/elasticsearch_for_us.md)

## To run the application locally
  * Ensure that your vagrant is running and provisioned.
    * `$ vagrant up`
  * Ensure your docker client is using the docker server running inside vagrant.
    * e.g. `export DOCKER_HOST=tcp://127.0.0.1:4243`
  * Build your docker images.
    * `$ make -j8` (or specify image, ex: `$ make beaker`)
  * Run your services and add to marathon
    * `$ make start`
  * Configure Bamboo for wiring
    * `$ make wire`
  * Add the following lines to your host machine's `/etc/hosts`
    * `10.10.10.10    bunsen-dev`
    * `10.10.10.10    bunsen-test`
  * Browse to http://bunsen-dev/

## Database
### [Read All About it](/docs/postgres)

## Seeding your development env

* First ensure that your containers are all running.
* Then run the following:

```bash
make run-seed
make run-index
```

## To run the test suite
  * Ensure that your vagant is running and provisioned, and your docker images are built (specified above).
  * For Bunsen in test mode, run: `$ make HOST=bunsen-test CONFIG=config/test.jq run-test`
  * To begin the test suite, run: `$ npm start` in the `tests` directory.

## Debugging tests
  * If you get a seed populate error or socket hang up on first few tests, try cancelling running tests and waiting (app takes 15-20 seconds after running containers to be ready)
  * Run one or more specific tests by tagging them with `@failed` and running `npm run-script failures` in the `tests` directory.
  * Run `@failed` scenarios under node-debug (allowing you to use Chrome web inspector to debug JS code) by running `npm run-script test` in the `tests` directory.

## Testing with ci.withmojo.com
  * Get credentials from @wkf
  * Authenticate with kerberos `$ kinit you@WITHMOJO.COM` and enter your credentials received from last step
  * Run the following lines in the command line, so that you can connect to ci.withmojo.com

  ```bash
  defaults write com.google.Chrome AuthServerWhitelist *.withmojo.com*
  defaults write com.google.Chrome AuthNegotiatePort 0
  defaults write com.google.Chrome AuthNegotiateDelegateWhitelist ""
  ```

  * Restart Chrome
  * If you have a CI remote already, remove it and run `$ git remote add ci git@github.com:mojotech/bunsen.git`
  * To send your branch for testing on ci, run `$ git push ci`

## Adding node packages

#### [Learn how to](docs/adding_node_packages.md)

## Updating embeded beaker-notebook

The beaker directory uses a [git subtree](https://github.com/git/git/blob/master/contrib/subtree/git-subtree.txt) to vendor the beaker-notebook repo. There are changes on this repo that are specific to the Bunsen world.

To update the beaker-notebook:
  * checkout `bunsen` branch of [beaker-notebook](http://github.com/twosigma/beaker-notebook.git) repo and make your changes
  * `$ cd core`
  * `$ npm install`
  * `$ npm run compile`
  * commit and push changes to bunsen branch on github
  * switch back to the `bunsen` project
  * git subtree pull --prefix=beaker/beaker-notebook http://github.com/twosigma/beaker-notebook.git bunsen
(For development, it's easier to make the changes directly in `bunsen/beaker/beaker-notebook` and run `cd core && npm install && npm run compile` from there.)
