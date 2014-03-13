module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('data_sets', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: DataTypes.STRING,
      vendor: DataTypes.STRING,
      description: DataTypes.TEXT,
      url: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    }).complete(done)
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('data_sets').complete(done)
  }
}
