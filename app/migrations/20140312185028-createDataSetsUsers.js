module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('DataSetsUsers', {
      dataSetId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('DataSetsUsers').complete(done);
  }
};
