var _ = require('lodash');

module.exports = function(Bookshelf, app){
  var models = app.Models;
  var query = Bookshelf.knex;

  var Category = Bookshelf.Model.extend({
    tableName: "Categories",

    dataSets: function() {
      return this.belongsToMany(models.DataSet, 'DataSetsCategories', 'categoryId', 'dataSetId')
    }
  }, {

    findAllWithCounts: function() {
      return query('Categories')
        .select('Categories.*')
        .count('DataSetsCategories.dataSetId AS dataCount')
        .join('DataSetsCategories', 'Categories.id', '=', 'DataSetsCategories.categoryId', 'LEFT OUTER')
        .groupBy('Categories.id', 'name', 'path')
        .orderBy('path')
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
          nodes[category.path] = _.extend(category, {
            category: category.name,
            count: +category.dataCount,
            children: []
          });
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
  });

  return {
    model: Category,
    name: "Category"
  }
}
