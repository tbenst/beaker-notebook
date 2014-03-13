module.exports = {
  up: function(migration, DataTypes, done) {
    migration.renameTable('data_sets', 'DataSets').complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.renameTable('DataSets', 'data_sets').complete(done);
  }
};
