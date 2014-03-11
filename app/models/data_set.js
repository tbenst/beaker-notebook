module.exports = function(sequelize, DataTypes) {
  var DataSet = sequelize.define('DataSet', {
    title: DataTypes.STRING,
    vendor: DataTypes.STRING,
    description: DataTypes.TEXT,
    url: DataTypes.STRING,
    format: DataTypes.STRING,
    rows: DataTypes.BIGINT,
    last_updated: DataTypes.DATE,
    vendor_id: DataTypes.INTEGER
  }, {
    tableName: 'data_sets',
    classMethods: {
      associate: function(models) {
        DataSet.hasOne(models.Vendor, {
          foreignKey: 'vendor_id'
        });

        DataSet.hasMany(models.User, {
          through: "data_sets_Users"
        });

        DataSet.hasMany(models.DataTag, {
          as: "Tags",
          through: "data_sets_data_tags"
        });

        DataSet.hasMany(models.Category, {
          as: 'categories',
          through: 'DataSetsCategories'
        });
      }
    }
  });

  return DataSet;
};
