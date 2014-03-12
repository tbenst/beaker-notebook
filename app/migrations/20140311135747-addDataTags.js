module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('data_tags', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING
    }).complete(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('data_tags').complete(done);
  }
}
