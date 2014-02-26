module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Project.belongsTo(models.User, {foreignKey: 'ownerId'});
      }
    }
  });

  return Project;
};
