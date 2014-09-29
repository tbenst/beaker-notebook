var _ = require('lodash');

module.exports = function(Bookshelf, app){
  var models = app.Models;
  var query = Bookshelf.knex;

  function fields(metadata, type) {
    return _(metadata).map(function(v, k) {
      if (v.indexes && _.contains(v.indexes, type)) {
        return k;
      }
    }).compact().value()
  }

  var Category = Bookshelf.Model.extend({
    tableName: "categories",

    idAttrs: ["name", "path"],

    dataSets: function() {
      return this.belongsToMany(models.DataSet, 'data_sets_categories', 'category_id', 'data_set_id')
    },

    notebooks: function() {
      return this.hasMany(models.Notebook);
    },

    filters: function() {
      return fields(this.get('metadata'), 'filter')
    },

    textFields: function() {
      return fields(this.get('metadata'), 'text')
    }
  }, {

    findAllWithCounts: function() {
      return query('categories')
        .select('categories.*')
        .count('data_sets_categories.data_set_id AS dataCount')
        .join('data_sets_categories', 'categories.id', '=', 'data_sets_categories.category_id', 'LEFT OUTER')
        .groupBy('categories.id', 'name', 'path')
        .orderBy('path')
    },

    catalogs: function() {
      return Category.query(function(q) {
        q.whereRaw("path ~ '0.*{1}'")
        q.orderBy('path', 'ASC')
      })
      .fetchAll()
      .then(function(c) {
        return c.models;
      })
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
