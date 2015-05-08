var _ = require('lodash');
var config  = require('./_config');
var Promise = require('bluebird');
var req = require('request');
var post = Promise.promisify(req.post);
var put = Promise.promisify(req.put);
var del = Promise.promisify(req.del);
var util = require('util');

module.exports = function() {

  var currentDatasetId = 1;

  function ensureSuccess(response, indexName) {
    if (response[0].statusCode != 201) {
      throw new Error(util.format(
        'Marketplace error: \r\nhttpCode: %s\nresponse: %s',
        response[0].statusCode, response[1]));
    }
    return refresh(indexName);
  }

  function refresh(indexName) {
    var payload = JSON.stringify({indexName: indexName});
    return put({
      url: config.marketplaceUrl + '/refresh',
      body: payload,
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  function updateCounts(indexName) {
    var payload = JSON.stringify({indexName: indexName});
    return put({
      url: config.marketplaceUrl + '/counts',
      body: payload,
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(function(response) {
      return ensureSuccess(response, indexName);
    });
  }

  function updateMappings(indexName) {
    var payload = JSON.stringify({indexName: indexName});
    return put({
      url: config.marketplaceUrl + '/mappings',
      body: payload,
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(function(response) {
      return ensureSuccess(response, indexName);
    });
  }

  function createRecords(indexName, recordType, records) {
    var payloadObj = {indexName: indexName};
    payloadObj[recordType] = Array.prototype.concat(records);
    recordType = recordType.indexOf('datasets') > -1 ? "seed/" + recordType : recordType;
    var payload = JSON.stringify(payloadObj);
    return post({
      url: config.marketplaceUrl + '/' + recordType,
      body: payload,
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(function(response) {
      return ensureSuccess(response, indexName);
    }).then(function() {
      return updateCounts(indexName);
    });
  }

  this.marketplace = {

    createIndex: function(indexName) {
      var payload = JSON.stringify({indexName: indexName});
      return post({
        url: config.marketplaceUrl + '/indices',
        body: payload,
        headers: {
          'content-type': 'application/json'
        }
      });
    },

    createCategories: function(indexName, categories) {
      _.each(categories, function(cat) {
        cat.id = cat.id || ('categories_' + cat.name);
      });
      return createRecords(indexName, 'categories', categories)
        .then(function() {
          return updateMappings(indexName);
        });
    },

    createDatasets: function(indexName, datasets) {
      _.each(datasets, function(set) {
        set.id = set.id || currentDatasetId;
        currentDatasetId += 1;
      });
      return createRecords(indexName, 'datasets', datasets)
        .then(function() {
          return updateCounts(indexName);
        });
    },

    deleteSeed: function() {
      return del(config.marketplaceUrl + '/seed/subscriptions');
    }
  };

  return this.marketplace;
};
