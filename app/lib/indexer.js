var _ = require('lodash');
var app = {};
var Promise = require('bluebird');
var elasticsearch = require('elasticsearch');

var elastic = {
  host: process.env.ELASTICSEARCH_PORT_9200_TCP_ADDR,
  port: process.env.ELASTICSEARCH_PORT_9200_TCP_PORT
};
var BATCH_SIZE = 1000;

app.Models = require('../models');

var client = new elasticsearch.Client({
  host: elastic.host + ':' + elastic.port
});

module.exports = {
  index: function() {
    return Promise.resolve(app)
      .then(app.Models.init)
      .then(this.clear)
      .then(indexAll)
      .then(indexCategories);
  },

  refresh: function() {
    return client.indices.refresh({index: '*'});
  },

  clear: function() {
    return clearIndex()
    .then(defineCatalogMappings);
  }
};

function clearIndex() {
  return client.indices.delete({index: '*'});
}

function defaultMapping() {
  return {
    "mappings": {
      "datasets": {
        "properties": {
          "title": {
            "type": "multi_field",
            "fields": {
               "title": {"type": "string", "index": "analyzed", "store": "yes"},
               "raw_title": {"type": "string", "index": "not_analyzed", "store": "yes"}
            }
          },
          "categories": {
            "type": "object",
            "properties": {
              "path": {
                "type": "string",
                "index": "not_analyzed"
              }
            }
          }
        }
      },
      "categories": {
        "properties": {
          "path": {
            "type": "string",
            "index": "not_analyzed"
          }
        }
      }
    }
  };
}

function defineMapping(catalog) {
  var mapping = defaultMapping();
  _.each(catalog.filters(), function(f) {
    mapping.mappings.datasets.properties[f] = {
      "type": "string",
      "index": "not_analyzed"
    };
  });
  return client.indices.create({
    index: 'catalog_' + catalog.get('path'),
    body: mapping
  });
}

function defineCatalogMappings() {
  var Category = app.Models.Category;
  return Category
  .catalogs()
  .then(function(catalogs) {
    return _.map(catalogs, defineMapping);
  })
}

function dataSetCount() {
  var DataSet = app.Models.DataSet;
  return Promise.resolve(DataSet.query().count('*'));
}

function indexAll() {
  return dataSetCount()
  .then(function(count) {
    var numBatches = Math.ceil(count[0]['count'] / BATCH_SIZE);
    return _.range(numBatches);
  })
  .then(function(batches) {
    return _.map(batches, indexBatch);
  });
}

function indexBatch(i) {
  return app.Models.DataSet
  .query(function(q) {
    q.limit(BATCH_SIZE)
    q.offset(i * BATCH_SIZE)
    q.orderBy('data_sets.id', 'ASC')
  })
  .fetchAll({withRelated: ['categories', 'dataPreviews']})
  .then(sendBulkRequest);
}

function indexCategories() {
  return app.DB.knex('categories')
        .select('categories.*')
        .count('data_sets_categories.data_set_id AS dataCount')
        .join('data_sets_categories', 'categories.id', '=', 'data_sets_categories.category_id', 'LEFT OUTER')
        .groupBy('categories.id', 'name', 'path')
        .orderBy('path')
  .then(function (categories) {
    var nodes = {},
        countedNodes = [];

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
          count: +category.dataCount,
        });
        countedNodes.push(nodes[category.path]);
      });
    }

    initNodes(categories);
    _.each(categories.reverse(), function(category) {
      var parentNode = parent(category.path),
          node = nodes[category.path];
      if (parentNode) {
        parentNode.count = parentNode.count + node.count;
      }
    });

    return countedNodes;
  })
  .then(sendBulkCategoryRequest)
}

function sendBulkRequest(dataSets) {
  var req = _(dataSets.models).map(function(dataSet) {
    return [
      {index: {_index: dataSet.indexName(), _type: 'datasets', _id: dataSet.id}},
      dataSet.elasticJSON()
    ];
  }).flatten().value();
  return client.bulk({body: req});
}

function sendBulkCategoryRequest(categories) {
  function indexName(category) {
    var path = category.path.substring(0,3)
    return 'catalog_' + path
  }
  var req = _(categories).map(function(category) {
    return [
      {index: {_index: indexName(category) , _type: 'categories', _id: category.id}},
      category
    ];
  }).flatten().value();
  return client.bulk({body: req});
}
