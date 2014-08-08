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
