# Beaker Service

Beaker service provides both the front end and back end of the actual Beaker
Notebook interface.

Beaker essentially provides an alternate version of the [Beaker-notebook](http://beakernotebook.com/) project,
with modifications that make it suitable for running inside Bunsen (and
unsusable in a desktop context).


## Updating embeded beaker-notebook

The beaker directory uses a [git subtree](https://github.com/git/git/blob/master/contrib/subtree/git-subtree.txt) to vendor the beaker-notebook repo. There are changes on this repo that are specific to the Bunsen world.

To update the beaker-notebook:

  * checkout `bunsen` branch of [beaker-notebook](http://github.com/twosigma/beaker-notebook.git) repo and make your changes
  * `$ cd core`
  * `$ npm install`
  * `$ npm run compile`
  * commit and push changes to bunsen branch on github
  * switch back to the `bunsen` project
  * git subtree pull --prefix=beaker/beaker-notebook
    http://github.com/twosigma/beaker-notebook.git bunsen

(For development, it's easier to make the changes directly in `bunsen/beaker/beaker-notebook` and run `cd core && npm install && npm run compile` from there.)
