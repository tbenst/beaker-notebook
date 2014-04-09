var _ = require("lodash");

module.exports = function(Bookshelf, app) {
  var query   = Bookshelf.knex;
  var User    = Bookshelf.Model.extend({
    tableName: "Users",
    hasTimestamp: true,

    projects: function(id) {
      return this.hasMany(app.Models.Project, 'ownerId')
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
    }
  });

  return {
    name: "User",
    model: User
  };
};
