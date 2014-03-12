module.exports = {
  up: function(migration, DataTypes, done) {
    migration.renameTable('data_tags', 'DataTags').complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.renameTable('DataTags', 'data_tags').complete(done);
  }
};
