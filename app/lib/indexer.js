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
    return refresh();
  },

  clear: function() {
    return clearIndex()
    .then(defineCatalogMappings);
  },

  indexTestCatalog: function (catalog) {
    return indexDuplicate(catalog);
  }
};

function indexDuplicate(catalog) {
  return client.indices.create({
    index: 'catalog_test',
    body: defaultMapping()
  })
  .then(function (){
    return client.index({
      index: 'catalog_test',
      type: 'categories',
      body: catalog.data[0]
    })
  })
  .then(refresh)
}

function refresh() {
  return client.indices.refresh({index: '*'});
}

function clearIndex() {
  return client.indices.delete({index: '*'})
  .then(refresh)
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
  })
  .then(refresh);
}

function defineCatalogMappings() {
  var Category = app.Models.Category;
  return Category
  .catalogs()
  .then(function(catalogs) {
    return Promise.reduce(catalogs, function(total, catalog) {
      return defineMapping(catalog);
    }, []);
  });
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
    return Promise.reduce(batches, function(total, batch) {
      return indexBatch(batch);
    }, []);
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
  .then(sendBulkDataSetRequest);
}

function getCategories() {
  return app.DB.knex('categories')
        .select('categories.*')
        .count('data_sets_categories.data_set_id AS dataCount')
        .leftOuterJoin('data_sets_categories', 'categories.id', 'data_sets_categories.category_id')
        .groupBy('categories.id', 'name', 'path')
        .orderBy('path')
}

function createCategoryTree(categories) {
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
}

function indexCategories() {
  return getCategories()
  .then(createCategoryTree)
  .then(sendBulkCategoryRequest)
}

function generateCatalogIndexName(category) {
  var path = category.path.substring(0,3)
  return 'catalog_' + path
}

function sendBulkDataSetRequest(dataSets) {
  var req = _(dataSets.models).map(function(dataSet) {
    return [
      {index: {_index: dataSet.indexName(), _type: 'datasets', _id: dataSet.id}},
      dataSet.elasticJSON()
    ];
  }).flatten().value();
  return client.bulk({body: req})
  .then(refresh)
}

function sendBulkCategoryRequest(categories) {
  function indexName(category) {
    var path = category.path.substring(0,3)
    return 'catalog_' + path
  }
  var req = _(categories).map(function(category) {
    return [
      {index: {
        _index: generateCatalogIndexName(category),
        _type: 'categories',
        _id: category.id
      }},
      category
    ];
  }).flatten().value();

  return client.bulk({body: req})
  .then(refresh)
}
