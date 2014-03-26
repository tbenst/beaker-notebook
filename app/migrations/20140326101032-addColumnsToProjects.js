module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('Projects', 'lastExecuted', DataTypes.DATE).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('Projects', 'lastExecuted').complete(done);
  }
};
