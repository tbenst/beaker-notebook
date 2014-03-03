module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('Projects', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      ownerId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    }).complete(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Projects').complete(done);
  }
};
