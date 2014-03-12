module.exports = function(sequelize, DataTypes) {
  var Vendor = sequelize.define('Vendor', {
    name: DataTypes.STRING
  }, {
    tableName: 'Vendors',
    classMethods: {
      associate: function(models) {
        Vendor.hasMany(models.DataSet, {
          as: 'DataSets',
          foreignKey: 'vendorId'
        });
      }
    }
  });

  return Vendor;
};
