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

  this.AfterAll(function() {
    // post back to the front_end server to report coverage
    return $.all[
      this.driver.executeScript('$.ajax("/coverage/client", {data: JSON.stringify(window.__coverage__),contentType: "application/json",type: "POST",complete: function(){}});'),
      this.driver.sleep(2000)
    ];
  });

  this.seed = function(models) {
    return Seed(Array.prototype.concat(models));
  };
};
