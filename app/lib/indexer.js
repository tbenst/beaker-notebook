var _ = require('lodash');
var app = {};
var Promise = require('bluebird');
var mapping = require('./indexer/mapping');
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
    .then(defineMapping);
  }
};

function clearIndex() {
  return client.indices.delete({index: '*'});
}

function dataSetCount() {
  var DataSet = app.Models.DataSet;
  return Promise.resolve(DataSet.query().count('*'));
}

function defineMapping() {
  return client.indices.create({
    index: 'bunsen',
    body: mapping
  });
}

function indexAll() {
  var i = 0;
  return dataSetCount()
  .then(function(count) {
    var numBatches = Math.ceil(count[0]['count'] / BATCH_SIZE);
    return _.range(numBatches);
  })
  .each(indexBatch);
}

function indexBatch(i) {
  return app.Models.DataSet
  .query({limit: BATCH_SIZE, offset: i * BATCH_SIZE})
  .fetchAll({withRelated: ['vendor', 'categories', 'dataTags']})
  .then(sendBulkRequest)
}

function sendBulkRequest(dataSets) {
  var req = _(dataSets.models).map(function(dataSet) {
    return [
      {index: {_index: 'bunsen', _type: 'datasets', _id: dataSet.id}},
      dataSet.toJSON()
    ];
  }).flatten().value();
  return client.bulk({body: req});
}

