var _ = require('lodash');
var config  = require('./_config');
var Promise = require('bluebird');
var req = require('request').defaults({json: true});
var post = Promise.promisify(req.post);
var get = Promise.promisify(req.get);
var put = Promise.promisify(req.put);
var del = Promise.promisify(req.del);
var util = require('util');

module.exports = function() {

  this.notebook = {

    createProject: function(attrs) {
      return post(config.notebookUrl + '/seed/projects', {body: attrs})
      .then(function(res) {
        return res[0].body;
      });
    },

    createNotebook: function(attrs) {
      return post(config.notebookUrl + '/seed/notebooks', {body: attrs});
    },

    getCategories: function() {
      return get(config.notebookUrl + '/categories')
      .then(function(response) {
        return response[0].body;
      });
    },

    createCategory: function(attrs) {
      return post(config.notebookUrl + '/categories', {body: attrs});
    },

    createPublication: function(attrs) {
      return post(config.notebookUrl + '/publications', {body: attrs});
    },

    deleteSeed: function() {
      return del(config.notebookUrl + '/seed');
    }
  };

  return this.notebook;
};
