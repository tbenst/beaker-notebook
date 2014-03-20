module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn("DataSets", "startDate", DataTypes.DATE).complete(done);
  },
  down: function(migration, DataTypes, done) {
    migration.removeColumn("DataSets", "startDate", DataTypes.DATE).complete(done);
  }
}
