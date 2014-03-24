module.exports = function(sequelize, DataTypes) {
  var DataPreview = sequelize.define('DataPreview', {
    previewUrl: DataTypes.STRING,
    smallPreviewUrl: DataTypes.STRING
  }, {
    tableName: 'DataPreviews',
    classMethods: {
      associate: function(models) {
        DataPreview.hasMany(models.DataSet, {
          through: "DataSetsDataPreviews",
          foreignKey: "dataPreviewId"
        });
      }
    }
  });

  return DataPreview;
};
