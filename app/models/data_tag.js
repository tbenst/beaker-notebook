module.exports = function(sequelize, DataTypes) {
  var DataTag = sequelize.define('DataTag', {
    name: DataTypes.STRING,
  }, {
    tableName: 'DataTags',
    classMethods: {
      associate: function(models) {
        DataTag.hasMany(models.DataSet, {
          through: "DataSetsDataTags",
          foreignKey: "dataTagId"
        });
      }
    }
  });

  return DataTag;
};
