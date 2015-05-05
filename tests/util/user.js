var config  = require('./_config');
var req = require('request').defaults({jar: true, json: true});
var Promise = require('bluebird');
var post = Promise.promisify(req.post);
var get = Promise.promisify(req.get);
var put = Promise.promisify(req.put);
var del = Promise.promisify(req.del);

module.exports = function() {
  this.user = {
    getDetails: function() {
      return get(config.userUrl + '/user')
      .then(function(res) {
        return res[1]; // return body
      });
    },
    createUser: function(attrs) {
      return post(config.userUrl + '/seed/users', {body: attrs})
      .then(function(res){
        return res[1];
      });
    },
    updateUser: function(attrs) {
      return put(config.userUrl + '/user', {body: attrs});
    },
    signUp: function(attrs) {
      return post(config.userUrl + '/users', {body: attrs});
    },
    deleteSeed: function() {
      return del(config.userUrl + '/seed');
    }
  }
  return this.user;
};
