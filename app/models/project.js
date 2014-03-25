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
      findAllByUser: function(userId) {
        var query =
          "SELECT \"Projects\".* FROM \"Projects\"\n"+
          "WHERE \"ownerId\" = %d \n";

        return sequelize.query(util.format(query, userId));
      },
    }
  });

  return Project;
};
