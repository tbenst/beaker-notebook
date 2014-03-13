module.exports = function(sequelize, DataTypes) {
  var DataSet = sequelize.define('DataSet', {
    title: DataTypes.STRING,
    vendor: DataTypes.STRING,
    description: DataTypes.TEXT,
    url: DataTypes.STRING
  }, {
    tableName: 'data_sets',
    classMethods: {
      associate: function(models) {
        DataSet.hasMany(models.User, {
          through: "data_sets_Users"
        });

        DataSet.hasMany(models.DataTag, {
          as: "Tags",
          through: "data_sets_data_tags"
        });
      }
    }
  });

  return DataSet;
};
