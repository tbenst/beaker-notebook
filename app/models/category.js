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
    },

    fetchFromElastic: function() {
      var _this = this;
      var q = {
        query: {
          term: {path: this.get('path')}
        }
      };
      return client.search({
        index: this.get('index'),
        type: 'categories',
        size: 1,
        body: q
      })
      .then(function(d) {
        if (d.length < 1) throw new Error('Category not found in Elasticsearch');
        var attrs = _.pluck(d.hits.hits, '_source')[0];
        _this.set(attrs);
        return _this;
      });
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
          nodes[category.index +'_'+ category.path] = _.extend(category, {
            category: category.name,
            count: +category.count,
            children: []
          });
        });
      }

      function parent(index, path) {
        var items = path.split('.');
        if (items.length == 1) {
          return null;
        } else {
          items.pop();
          return nodes[index +'_'+items.join('.')];
        }
      }

      function transformResults(results) {
        return _.map(results.hits.hits, function (result) {
          return _.extend(result._source, {index: result._index})
        })
      }

      function generateTree(categories) {
        initNodes(categories);
        _.each(categories.reverse(), function(category) {
          var parentNode = parent(category.index, category.path),
              node = nodes[category.index+'_'+category.path];
          if (parentNode) {
            parentNode.children.unshift(node);
          } else {
            roots.unshift(node);
          }
        });

        return _.map(roots, function(root) {
          return nodes[root.index+'_'+root.path];
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
