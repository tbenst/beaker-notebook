module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Users').complete(done);
  }
};
