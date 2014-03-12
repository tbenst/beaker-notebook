module.exports = function(sequelize, DataTypes) {
  var Vendor = sequelize.define('Vendor', {
    name: DataTypes.STRING
  }, {
    tableName: 'vendors',
    classMethods: {
      associate: function(models) {
        Vendor.hasMany(models.DataSet, {as: 'DataSets'})
      }
    }
  });

  return Vendor;
};
