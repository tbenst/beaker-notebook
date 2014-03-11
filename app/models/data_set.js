module.exports = function(sequelize, DataTypes) {
  var DataSet = sequelize.define('DataSet', {
    title: DataTypes.STRING,
    vendor: DataTypes.STRING,
    description: DataTypes.TEXT,
    url: DataTypes.STRING,
    format: DataTypes.STRING,
    rows: DataTypes.BIGINT,
    last_updated: DataTypes.DATE
  }, {
    tableName: 'data_sets',
    classMethods: {
      associate: function(models) {
        DataSet.hasMany(models.User, {
          through: "data_sets_Users"
        });
      }
    }
  });

  return DataSet;
};
