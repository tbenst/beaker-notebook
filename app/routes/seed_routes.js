var Promise     = require('bluebird');
var Seed        = require("../seed");
var exec        = Promise.promisify(require('child_process').exec);
var path        = require("path");
var _           = require("lodash");

module.exports = function(app) {
  app.post("/seed/data", function(req, res) {
    Seed([req.body]).then(function() {
      res.send(200);
    });
  });

  app.post("/seed/drop-repos", function(req, res) {
    exec("rm -rf " + path.resolve(__dirname, '/repos'))
    .then(function() {
      res.send(200);
    })
    .catch(function() {
      res.send(500);
    });
  });

  app.post("/seed/drop-all", function(req, res) {
    Seed.dropAll().then(function() {
      res.send(200);
    });
  });

  app.post("/seed/fetch", function(req, res) {
    app.Models[req.body.modelName].forge(req.body.data).fetch().then(function(d) {
      res.json(d);
    }).catch(function(e) {
      res.send(500);
    });
  });
}
