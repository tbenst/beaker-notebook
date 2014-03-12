module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('DataSetsCategories', {
      data_setId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('DataSetsCategories').complete(done);
  }
};
