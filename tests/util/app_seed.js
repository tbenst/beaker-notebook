var request     = require('request');
var util        = require('util');
var _           = require('lodash');
var Seed        = require('../../app/seed');

module.exports = function() {
  this.BeforeAll(function() {
    return Seed.dropAll();
  });

  this.seed = function(models) {
    return Seed(Array.prototype.concat(models));
  };
};
