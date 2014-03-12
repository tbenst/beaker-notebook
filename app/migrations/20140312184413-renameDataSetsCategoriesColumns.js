module.exports = {
  up: function(migration, DataTypes, done) {
    migration.renameColumn('DataSetsCategories', 'data_setId', 'dataSetId')
      .then(function() {
        return migration.renameColumn('DataSetsCategories', 'CategoryId', 'categoryId');
      }).then(function() {done()}).catch(done);
  },

  down: function(migration, DataTypes, done) {
    migration.renameColumn('DataSetsCategories', 'dataSetId', 'data_setId')
      .then(function() {
        return migration.renameColumn('DataSetsCategories', 'categoryId', 'CategoryId');
      }).then(function() {done()}).catch(done);
  }
};
