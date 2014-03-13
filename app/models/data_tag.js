module.exports = function(sequelize, DataTypes) {
  var DataTag = sequelize.define('DataTag', {
    name: DataTypes.STRING,
  }, {
    tableName: 'data_tags',
    classMethods: {
      associate: function(models) {
        DataTag.hasMany(models.DataSet, {
          through: "data_sets_data_tags"
        });
      }
    }
  });

  return DataTag;
};
