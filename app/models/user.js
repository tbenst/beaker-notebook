module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Project, {foreignKey: 'ownerId'});
        User.hasMany(models.DataSet, {
          as: 'subscriptions',
          through: 'data_sets_Users'
        });
      }
    }
  });

  return User;
};
