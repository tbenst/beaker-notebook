var util = require('util');

module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Project.belongsTo(models.User, {foreignKey: 'ownerId'});
      },

      findMatching: function(filters) {
        var queries = [Project.findByUserSql(filters.userId)];

        if (filters.filterBy !== void(0) && filters.filterBy.length) {
          queries.push(Project.findBySearchParam(filters.filterBy));
        }

        return sequelize.query(queries.join("\nINTERSECT\n"));
      },

      findBySearchParam: function(searchTerm) {
        var query =
          "SELECT \"Projects\".* FROM \"Projects\"\n"+
          "WHERE \"name\" LIKE '%%%s%%' \n"

        return util.format(query, searchTerm);
      },

      findByUserSql: function(userId) {
        var query =
          "SELECT \"Projects\".* FROM \"Projects\"\n"+
          "WHERE \"ownerId\" = %d \n";

        return util.format(query, userId);
      },
    }
  });

  return Project;
};
