module.exports = {
  up: function(migration, DataTypes, done) {
    migration.migrator.sequelize.query("CREATE EXTENSION IF NOT EXISTS ltree")
      .then(function() {
        return migration.createTable('Categories', {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          name: DataTypes.STRING,
          createdAt: DataTypes.DATE,
          updatedAt: DataTypes.DATE
        });
      })
      .then(function() {
        return migration.migrator.sequelize.query('ALTER TABLE "Categories" ADD path LTREE');
      })
      .then(function() {
        console.log("addIndex")
        return migration.addIndex(
          'Categories',
          ['path'],
          {
            indexName: 'CategoriesPathIndex',
            indexType: 'GIST'
          }
        );
      }).then(function() {done()}).catch(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Categories').complete(done);
  }
};
