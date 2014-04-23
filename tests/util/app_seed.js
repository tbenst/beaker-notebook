var request     = require('request');
var util        = require('util');
var _           = require('lodash');
var Seed        = require('../../app/seed');
var Promise     = require('bluebird');
var exec        = Promise.promisify(require('child_process').exec);
var path        = require("path");

module.exports = function() {
  var _this = this;
  this.BeforeAll(function() {
    return exec("rm -rf " + path.resolve(__dirname, '../../', 'app/repos'))
    .then(function() {
      return Seed.dropAll();
    })
    .then(function(models) {
      _this.Models = models;
    })
    .catch(function(e) {
      console.log(e);
    })
  });

  this.seed = function(models) {
    return Seed(Array.prototype.concat(models));
  };
};
