var _ = require('lodash');
var elasticsearch = require('elasticsearch');
var elastic = {
  host: process.env.ELASTICSEARCH_PORT_9200_TCP_ADDR,
  port: process.env.ELASTICSEARCH_PORT_9200_TCP_PORT
};
var MAX_RESULTS = 9999;

module.exports = function(Bookshelf, app){
  var models = app.Models;
  var query = Bookshelf.knex;
  var client = new elasticsearch.Client({
    host: elastic.host + ':' + elastic.port
  });

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

    tree: function(root, depth) {
      var nodes = {},
          roots = [],
          root = root || 0;

      function initNodes(categories) {
        _.each(categories, function(category) {
          nodes[category.path] = _.extend(category, {
            category: category.name,
            count: +category.count,
            children: []
          });
        });
      }

      function parent(path) {
        var items = path.split('.');
        if (items.length == 1) {
          return null;
        } else {
          items.pop();
          return nodes[items.join('.')];
        }
      }

      function transformResults(results) {
        return _.pluck(results.hits.hits, '_source');
      }

      function generateTree(categories) {
        initNodes(categories);
        _.each(categories.reverse(), function(category) {
          var parentNode = parent(category.path),
              node = nodes[category.path];
          if (parentNode) {
            parentNode.children.unshift(node);
          } else {
            roots.unshift(node);
          }
        });

        return _.map(roots, function(root) {
          return nodes[root.path];
        });
      }

      return client.search({
        type: 'categories',
        from: 0,
        size: MAX_RESULTS,
        body: {
          sort: [ "path"],
          query: {
            regexp: {
              "path": ''+root+'(\.[0-9]*){0,'+depth+'}'
            }
          }
        }
      })
      .then(transformResults)
      .then(generateTree)
    },
  });

  return {
    model: Category,
    name: "Category"
  }
}
