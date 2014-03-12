module.exports = {
  up: function(migration, DataTypes, done) {
    migration.renameColumn('DataSets', 'last_updated', 'lastUpdated')
      .then(function() {
        return migration.renameColumn('DataSets', 'vendor_id', 'vendorId');
      }).then(function() {done()}).catch(done);
  },

  down: function(migration, DataTypes, done) {
    migration.renameColumn('DataSets', 'lastUpdated', 'last_updated')
      .then(function() {
        return migration.renameColumn('DataSets', 'vendorId', 'vendor_id');
      }).then(function() {done()}).catch(done);
  }
};
