var _                     = require("lodash");

module.exports = function(Bookshelf, app) {
  var query   = Bookshelf.knex;
  var User    = Bookshelf.Model.extend({
    tableName: "Users",

    idAttrs: ["email"],

    projects: function(id) {
      return this.hasMany(app.Models.Project, 'ownerId')
    },

    notebooks: function(id) {
      return this.hasMany(app.Models.Notebook, 'userId')
    },

    subscriptions: function() {
      return this.hasMany(app.Models.Subscription, 'userId');
    },

    addSubscription: function(dataSet) {
      return app.Models.Subscription.forge({
        dataSetId: dataSet.id,
        userId: this.id
      }).save()
    },

    removeSubscription: function(dataSet) {
      return app.Models.Subscription.forge({
        dataSetId: dataSet.id,
        userId: this.id
      })
      .fetch()
      .then(function(subscription) {
        return subscription.destroy();
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
