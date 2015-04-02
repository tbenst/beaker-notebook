var _ = require('lodash');
var config  = require('./_config');
var Promise = require('bluebird');
var req = require('request');
var post = Promise.promisify(req.post);
var get = Promise.promisify(req.get);
var put = Promise.promisify(req.put);
var del = Promise.promisify(req.del);
var util = require('util');

module.exports = function() {

  this.beakerPublications = {

    getCategories: function() {
      return get(config.publicationsUrl + '/categories', {json: true})
      .then(function(response) {
        return response[0].body;
      });
    },

    createCategory: function(attrs) {
      return post(config.publicationsUrl + '/categories', {json: true, body: attrs});
    },

    createPublication: function(attrs) {
      return post(config.publicationsUrl + '/publications', {json: true, body: attrs});
    },

    deleteSeed: function() {
      return del(config.publicationsUrl + '/seed', {json: true});
    }
  }

  return this.beakerPublications;
};
