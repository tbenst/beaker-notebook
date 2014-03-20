module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('DataSets', 'updateFrequency', DataTypes.STRING).complete(done);
  },
  down: function(migration, DataTypes, done) {
    migration.removeColumn('DataSets', 'updateFrequency').complete(done);
  }
}
