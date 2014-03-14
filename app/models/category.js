var _ = require('lodash'),
    util = require('util');

module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    name: DataTypes.TEXT,
    path: DataTypes.TEXT // this has 'ltree' type in the db, but is declared as TEXT to have getters/setters
  }, {
    classMethods: {
      associate: function(models) {
        Category.hasMany(models.DataSet, {
          as: 'dataSets',
          through: 'DataSetsCategories',
          foreignKey: 'categoryId'
        });
      },

      findAllWithCounts: function() {
        var query =
          "SELECT id, name, path, COUNT(\"DataSetsCategories\".\"dataSetId\") AS \"dataCount\"\n" +
          "FROM \"Categories\"\n" +
          "LEFT OUTER JOIN \"DataSetsCategories\" ON \"Categories\".id = \"DataSetsCategories\".\"categoryId\"\n" +
          "GROUP BY id, name, path\n" +
          "ORDER BY path";

        return sequelize.query(query);
      },

      tree: function() {
        var nodes = {},
            roots = [];

        function parent(path) {
          var items = path.split('.');
          if (items.length == 1) {
            return null;
          } else {
            items.pop();
            return nodes[items.join('.')];
          }
        }

        function initNodes(categories) {
          _.each(categories, function(category) {
            nodes[category.path] = {
              category: category.name,
              id: category.id,
              path: category.path,
              count: +category.dataCount,
              children: []
            };
          });
        }

        return Category.findAllWithCounts()
          .then(function(categories) {

            initNodes(categories);

            _.each(categories.reverse(), function(category) {
              var parentNode = parent(category.path),
                  node = nodes[category.path];
              if (parentNode) {
                parentNode.children.unshift(node);
                parentNode.count = parentNode.count + node.count;
              } else {
                roots.unshift(node);
              }
            });

            return _.map(roots, function(root) {
              return nodes[root.path];
            });
          });
      }
    }
  });

  return Category;
};
