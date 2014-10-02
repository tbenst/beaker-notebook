var _                     = require("lodash");

module.exports = function(Bookshelf, app) {
  var query   = Bookshelf.knex;
  var User    = Bookshelf.Model.extend({
    tableName: "users",

    idAttrs: ["email"],

    initialize: function () {
      this.on("created", this.createDefaultProject);
    },

    createDefaultProject: function() {
      return app.Models.Project.forge({ownerId: this.id, name: 'Sandbox', description: 'Sandbox'})
      .save()
    },

    projects: function(id) {
      return this.hasMany(app.Models.Project, 'owner_id')
    },

    notebooks: function(id) {
      return this.hasMany(app.Models.Notebook)
    },

    subscriptions: function() {
      return this.hasMany(app.Models.Subscription);
    },

    publications: function() {
      return this.hasMany(app.Models.Publication, 'user_id').through(app.Models.Notebook, 'notebook_id');
    },

    beakerClaim: function() {
      return this.hasOne(app.Models.BeakerClaim, 'user_id')
    },

    addSubscription: function(dataSetId) {
      return app.Models.Subscription.forge({
        dataSetId: dataSetId,
        userId: this.id
      }).save()
    },

    removeSubscription: function(dataSetId) {
      return app.Models.Subscription.forge({
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
        return app.Models.DataSet.findByIds({ids: ids})
        .then(function(datasets) {
          // inject datasets into subscriptions
          return _.map(subscriptions.toJSON(), function(s) {
            var dataSet = _.findWhere(datasets, {id: s.dataSetId});
            return _.extend(s, {dataSet: dataSet});
          })
        })
      })
    }
  });

  User = _.extend(User, {
    findOneWhere: function(attrs) {
      return User.forge(attrs)
      .fetch()
    },

    findOrCreate: function(attrs) {
      var user = new User(attrs);
      return user.fetch()
        .then(function(u) {
          if (u) {
            return u;
          } else {
            return user.save()
              .then(function(u) {
                return u;
              });
          }
        });
    }
  });

  return {
    name: "User",
    model: User
  };
};
