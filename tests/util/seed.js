var _  = require('lodash');
var config  = require('./_config');
var Promise = require('bluebird');
var post    = Promise.promisify(require('request').post);
var base    = config().appServer.url + 'seed';

module.exports = function() {

  this.seed = {
    populate: function(models) {
      var modelsArray = Array.prototype.concat(models);
      var promiseArray = _.map(modelsArray, function(model) {
        return post(base + "/data", {form: model});
      });
      return Promise.all(promiseArray);
    },

    dropRepos: function() {
      return post(base + "/drop-repos");
    },

    dropAll: function() {
      return post(base + "/drop-all");
    },

    fetch: function(modelName, data) {
      return post(base + "/fetch", {
        form: {
          modelName: modelName,
          data: data
        }
      });
    }
  }

  this.BeforeAll(function() {
    return this.seed.dropRepos()
    .then(function() {
      return this.seed.dropAll();
    }.bind(this))
    .catch(function(e) {
      console.log(e);
    })
  }.bind(this));

  return this.seed;
};
