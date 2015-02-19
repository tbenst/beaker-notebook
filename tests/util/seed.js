var _  = require('lodash');
var config  = require('./_config');
var Promise = require('bluebird');
var util = require('util');
var post    = Promise.promisify(require('request').post);
var base    = config.bunsenUrl + 'api/seed';
var del = Promise.promisify(require('request').del);

module.exports = function() {
  this.USER_ROLE = {
    researcher: 0,
    administrator: 1
  };

  this.seed = {
    populate: function(models) {
      var modelsArray = Array.prototype.concat(models);
      var shouldReindex = _.find(modelsArray, function(m) {
        if (m.data.name) {
          return (m.data.name !== 'Duplicate Path') && (m.model == 'Category' || m.model == 'DataSet')
        } else {
          return m.model == 'Category' || m.model == 'DataSet'
        }
      })
      var duplicatePathCategory = _.find(modelsArray, function(m) {
        return m.data.name ? m.data.name == 'Duplicate Path': false;
      })

      return Promise.reduce(modelsArray, function(result, model) {
        var route = model.model == "User" ? "/sign-up" : "/data";

        return post(base + route, {form: model}).
          then(function(response) {
            if (response[0].statusCode != 200) {
              throw new Error(util.format(
                "Seed populate error.\r\nhttpCode: %s\nresponse: %s",
                response[0].statusCode, response[1]));
            }
            else {
              var models = Array.prototype.concat(JSON.parse(response[0].body));
              models = _.flatten(models);
              if (models.length == 1) models = models[0];
              result.push(models)
              return result;
            }
          });
      }, [])
      .then(function(result) {
        function reindex(result) {
          if(shouldReindex){
            return post(base + "/reindex");
          } else if(duplicatePathCategory) {
            return post(base + "/index-test-catalog", {
              form: {
                data: result
              }
            });
          } else {
            return Promise.resolve();
          }
        }

        return reindex(result)
        .then(function() {
          return post(base + "/refresh-index");
        })
        .then(function() {
          return result;
        });
      });
    },

    dropRepos: function() {
      return post(base + "/drop-repos");
    },

    dropIndex: function() {
      return post(base + "/drop-index");
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
    },

    deleteNotebookGit: function(name) {
      return this.fetch("Notebook", {name: name})
      .then(function(res) {
        return del(base + "/remove-notebook-git/" + JSON.parse(res[0].body).id);
      });
    }
  }

  this.BeforeAll(function() {
    return this.seed.dropRepos()
    .then(function() {
      return this.seed.dropAll();
    }.bind(this))
    .then(function() {
      return this.seed.dropIndex();
    }.bind(this))
    .catch(function(e) {
      console.log(e);
    })
  }.bind(this));

  return this.seed;
};
