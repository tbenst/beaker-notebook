module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('data_sets', 'format', DataTypes.STRING).then(function(){
      migration.addColumn('data_sets', 'rows', DataTypes.BIGINT);
    }).then(function() {
      migration.addColumn('data_sets', 'last_updated', DataTypes.DATE);
    }).then(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('data_sets', 'format').then(function(){
      migration.removeColumn('data_sets', 'rows');
    }).then(function() {
      migration.removeColumn('data_sets', 'last_updated');
    }).then(done);
  }
}
