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
          through: 'DataSetsCategories'
        });
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
              category: category,
              children: []
            };
          });
        }

        return Category.findAll({order: 'path'})
          .then(function(categories) {

            initNodes(categories);

            _.each(categories, function(category) {
              var parentNode = parent(category.path),
                  node = nodes[category.path];
              if (parentNode) {
                parentNode.children.push(node);
              } else {
                roots.push(node);
              }
            });

            return _.map(roots, function(root) {
              return nodes[root.category.path];
            });
          });
      }
    }
  });

  return Category;
};
