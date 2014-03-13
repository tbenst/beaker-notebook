module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('data_sets', 'format', DataTypes.STRING).then(function(){
      return migration.addColumn('data_sets', 'rows', DataTypes.BIGINT);
    }).then(function() {
      return migration.addColumn('data_sets', 'last_updated', DataTypes.DATE);
    }).then(function(){done()}).catch(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('data_sets', 'format').then(function(){
      return migration.removeColumn('data_sets', 'rows');
    }).then(function() {
      return migration.removeColumn('data_sets', 'last_updated');
    }).then(function(){done()}).catch(done);
  }
}
