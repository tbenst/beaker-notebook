module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('DataPreviews', {
      previewUrl: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    }).complete(function() {
      migration.createTable('DataSetsDataPreviews', {
        dataSetId: DataTypes.INTEGER,
        dataPreviewId: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
      }).complete(done);
    });
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('DataPreviews').complete(function() {
      migration.dropTable('DataSetsDataPreviews').complete(done);
    });
  }
}
