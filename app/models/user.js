var _                     = require("lodash");
var Promise               = require('bluebird');
var Checkit               = require('checkit');
var Crypto                = require('crypto');
var moment                = require('moment');
var PasswordResetException = require('../lib/password_reset_exception');
var RecordNotUniqueError = require('../lib/record_not_unique_error');
var path = require('path');
var fileTree = require('../lib/file_tree_generator');
var fs = Promise.promisifyAll(require('fs-extra'))

module.exports = function(Bookshelf, app) {
  var query   = Bookshelf.knex;
  var User    = Bookshelf.Model.extend({
    tableName: "users",

    projects: function(id) {
      return this.hasMany(app.Models.Project, 'owner_id')
    },

    notebooks: function(id) {
      return this.hasMany(app.Models.Notebook)
    },

    ratings: function() {
      return this.hasMany(app.Models.Rating);
    },

    subscriptions: function() {
      return this.hasMany(app.Models.Subscription);
    },

    publications: function() {
      return this.hasMany(app.Models.Publication, 'user_id').through(app.Models.Notebook, 'notebook_id');
    },

    gravatar: function() {
      var email = this.get('email');

      // If a user does not have an email yet
      // default to an empty string.
      email = email ? email.trim().toLowerCase() : "";

      var hash = Crypto.createHash('md5').update(email).digest('hex');
      return 'https://secure.gravatar.com/avatar/' + hash + '?d=retro';
    },

    addSubscription: function(indexName, dataSetId) {
      return app.Models.Subscription.forge({
        indexName: indexName,
        dataSetId: dataSetId,
        userId: this.id
      }).save()
    },

    removeSubscription: function(indexName, dataSetId) {
      return app.Models.Subscription.forge({
        indexName: indexName,
        dataSetId: dataSetId,
        userId: this.id
      })
      .fetch()
      .then(function(subscription) {
        return subscription.destroy();
      })
    },

    subscriptionsWithDatasets: function() {
      return this.subscriptions()
      .fetch()
      .then(function(subscriptions) {
        var ids = _.invoke(subscriptions.models, 'get', 'dataSetId');
        return app.Models.DataSet.findByIds({ids: ids, index: '*'})
        .then(function(datasets) {
          // inject catalog into datasets
          return Promise.map(datasets, function(set) {
            var dataset = app.Models.DataSet.forge(set);
            return new app.Models.Category({path: dataset.catalogPath(), index: dataset.get('index')})
            .fetchFromElastic()
            .then(function(catalog) {
              dataset.set('catalog', catalog);
              // Cast dataset ID to a string so that
              // we can find it given a string ID on the subscription model.
              dataset.set('id', String(dataset.get('id')));
              return dataset.toJSON()
            })
          });
        })
        .then(function(datasets) {
          // inject datasets into subscriptions
          return _.map(subscriptions.toJSON(), function(s) {
            var dataSet = _.findWhere(datasets,
                                      {id: s.dataSetId, index: s.indexName});
            return _.extend(s, {dataSet: dataSet});
          })
        })
      })
    },

    getScratchSpacePath: function() {
      return path.join(process.env.SCRATCH_SPACE_ROOT, this.id.toString());
    },

    ensureScratchSpace: function() {
      var dir = this.getScratchSpacePath();
      fs.ensureDirSync(dir);
      return dir;
    },

    getScratchSpaceContents: function() {
      return fileTree(this.ensureScratchSpace(), process.env.SCRATCH_SPACE_PRESENTATION_DIR);
    },

    emptyScratchSpace: function() {
      return fs.readdirAsync(this.getScratchSpacePath())
      .each(function(file) {
        return fs.unlinkAsync(file);
      });
    },

    deleteFiles: function(files) {
      var _this = this;
      return Promise.each(files, function(file) {
        var filePath = file.replace(process.env.SCRATCH_SPACE_PRESENTATION_DIR, '');
        return fs.unlinkAsync(_this.getScratchSpacePath() + filePath);
      });
    },

    isAdmin: function() {
      return this.get('role') == 1;
    }
  });

  User = _.extend(User, {
    changePassword: function(attrs) {
      function isExpired(rpr) {
        return moment().utc().diff(moment(new Date(rpr.get('createdAt'))).utc(), 'hours') >=24;
      };

      return app.Models.ForgotPasswordRequests.forge({requestId: attrs.requestId})
      .fetch()
      .then(function(resetPasswordRequest) {
        if (!resetPasswordRequest) {
          throw new PasswordResetException('Password link is invalid or has already been used');
        } else if (isExpired(resetPasswordRequest)) {
          resetPasswordRequest.destroy();
          throw new PasswordResetException('Sorry your request has expired');
        } else {
          return User.forge({id: resetPasswordRequest.get('userId')}).fetch()
            .then(function(user) {
              return user.save({password: attrs.password})
                .then(function() {
                  return resetPasswordRequest.destroy();
                })
            })
        }
      })
    }
  });

  return {
    name: "User",
    model: User
  };
};
