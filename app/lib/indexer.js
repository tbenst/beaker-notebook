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
      .then(indexAll);
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
  return Category.catalogs()
  .each(defineMapping);
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
  .each(indexBatch);
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

function sendBulkRequest(dataSets) {
  var req = _(dataSets.models).map(function(dataSet) {
    return [
      {index: {_index: dataSet.indexName(), _type: 'datasets', _id: dataSet.id}},
      dataSet.elasticJSON()
    ];
  }).flatten().value();
  return client.bulk({body: req});
}
