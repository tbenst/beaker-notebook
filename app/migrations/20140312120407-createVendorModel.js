module.exports = {
  up: function(migration, DataTypes, done) {
    migration.removeColumn('data_sets', 'vendor').then(function() {
      return migration.createTable('vendors', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        name: DataTypes.STRING
      }).then(function() {
        return migration.addColumn('data_sets', 'vendor_id', DataTypes.INTEGER);
      }).then(function(){done()}).catch(done);;
    });
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('vendors').success(function() {
      migration.addColumn('data_sets', 'vendor', DataTypes.STRING).then(function() {
        return migration.removeColumn('data_sets', 'vendor_id');
      }).then(function() {done()}).catch(done);
    });
  }
}
