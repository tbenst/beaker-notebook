var Promise     = require('bluebird');
var Seed        = require("../seed");
var exec        = Promise.promisify(require('child_process').exec);
var path        = require("path");
var _           = require("lodash");
var indexer     = require('../lib/indexer');

module.exports = function(app) {
  app.post("/api/seed/data", function(req, res, next) {
    Seed([req.body]).then(function(data) {
      res.json(data);
    })
    .catch(next);
  });

  app.post("/api/seed/sign-up", function(req, res, next) {
    app.Models.User.signUp(req.body.data)
    .then(res.json.bind(res))
    .catch(next);
  });

  app.post("/api/seed/drop-repos", function(req, res, next) {
    exec("rm -rf " + path.resolve(__dirname, '../.repos'))
    .then(function() {
      res.send(200);
    })
    .catch(next);
  });

  app.post("/api/seed/drop-all", function(req, res, next) {
    Seed.dropAll().then(function() {
      res.send(200);
    })
    .catch(next);
  });

  app.post("/api/seed/fetch", function(req, res, next) {
    app.Models[req.body.modelName].forge(req.body.data).fetch().then(function(d) {
      res.json(d);
    })
    .catch(next);
  });

  app.post("/api/seed/drop-index", function(req, res, next) {
    indexer.clear()
    .then(function() {
      res.send(200);
    })
    .catch(next);
  });

  app.post("/api/seed/refresh-index", function(req, res, next) {
    indexer.refresh()
    .then(function() {
      res.send(200);
    })
    .catch(next);
  });

  app.post("/api/seed/index-test-catalog", function(req, res, next) {
    indexer.indexTestCatalog(req.body)
    .then(function() {
      res.send(200);
    })
    .catch(next);
  });

  app.post("/api/seed/reindex", function(req, res, next) {
    indexer.index()
    .then(function() {
      res.send(200);
    })
    .catch(next);
  });

  app.delete("/api/seed/remove-notebook-git/:id", function(req, res, next) {
    app.Models.Notebook.forge({id: req.params.id}).fetch()
    .then(function(notebook) {
      notebook.removeGitContents()
      .then(function() {
        res.send(200);
      })
      .catch(next);
    });
  });
}
