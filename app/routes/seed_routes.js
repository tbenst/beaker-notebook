var Promise     = require('bluebird');
var Seed        = require("../seed");
var exec        = Promise.promisify(require('child_process').exec);
var path        = require("path");
var _           = require("lodash");

module.exports = function(app) {
  app.post("/seed/data", function(req, res, next) {
    Seed([req.body]).then(function(data) {
      res.json(data);
    })
    .catch(next);
  });

  app.post("/seed/drop-repos", function(req, res, next) {
    exec("rm -rf " + path.resolve(__dirname, '/repos'))
    .then(function() {
      res.send(200);
    })
    .catch(next);
  });

  app.post("/seed/drop-all", function(req, res, next) {
    Seed.dropAll().then(function() {
      res.send(200);
    })
    .catch(next);
  });

  app.post("/seed/fetch", function(req, res, next) {
    app.Models[req.body.modelName].forge(req.body.data).fetch().then(function(d) {
      res.json(d);
    })
    .catch(next);
  });
}
