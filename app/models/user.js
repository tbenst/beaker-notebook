var _ = require("lodash");

module.exports = function(Bookshelf, app) {
  var query   = Bookshelf.knex;
  var Models  = app.Models
  var User    = Bookshelf.Model.extend({
    tableName: "Users",
    hasTimestamp: true,

    projects: function(id) {
      return this.hasMany(Models.Project, 'ownerId')
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
