module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('DataPreviews', 'smallPreviewUrl', DataTypes.STRING).complete(done);
  },
  down: function(migration, DataTypes, done) {
    migration.removeColumn('DataPreviews', 'smallPreviewUrl').complete(done);
  }
}
