var _                     = require("lodash");
var MAX_RECENT_NOTEBOOKS  = 5;

module.exports = function(Bookshelf, app) {
  var query   = Bookshelf.knex;
  var User    = Bookshelf.Model.extend({
    tableName: "Users",

    projects: function(id) {
      return this.hasMany(app.Models.Project, 'ownerId')
    },

    notebooks: function(id) {
      return this.hasMany(app.Models.Notebook, 'userId')
    },

    openNotebooks: function() {
      return this.hasMany(app.Models.OpenNotebook, 'userId');
    },

    addRecentNotebook: function(notebook) {
      var recentNotebooks = _.uniq([notebook].concat(this.getRecentNotebooks())
                            .slice(0, MAX_RECENT_NOTEBOOKS), function(n) {
                              return n.projectId + "-" + n.notebookId;
                            });

      return this.save({
        recentNotebooks: JSON.stringify(recentNotebooks)
      }, {patch: true});
    },

    getRecentNotebooks: function() {
      return JSON.parse(this.get("recentNotebooks"));
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
