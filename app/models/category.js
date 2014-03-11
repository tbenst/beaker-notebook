module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    name: DataTypes.TEXT,
    path: DataTypes.TEXT // this has 'ltree' type in the db, but is declared as TEXT to have getters/setters
  }, {
    classMethods: {
      associate: function(models) {
        Category.hasMany(models.DataSet, {
          as: 'dataSets',
          through: 'DataSetsCategories'
        });
      }
    }
  });

  return Category;
};
