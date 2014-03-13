module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('DataSetsDataTags', {
      dataSetId: DataTypes.INTEGER,
      dataTagId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('DataSetsDataTags').complete(done);
  }
};
