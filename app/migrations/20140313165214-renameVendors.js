module.exports = {
  up: function(migration, DataTypes, done) {
    migration.renameTable('vendors', 'Vendors').complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.renameTable('Vendors', 'vendors').complete(done);
  }
};
