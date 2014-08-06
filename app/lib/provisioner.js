var restler = require('./promising_restler');
var url = require('url');

Provisioner = restler.service(function(options) {
  this.baseURL = url.format({protocol: 'http',
    hostname: options.host,
    port: options.port
  });
}, null, {
  provision: function() {
    return this.postAsync('beaker/instances').spread(function(data, res) {
      return data;
    })
  },

  inspect: function(id) {
    return this.getAsync('beaker/instances/' + id).spread(function(data, res) {
      if (res.statusCode == 404) {
        return null;
      }
      return data;
    }).catch(function(e) {
      console.log("Failed to inspect beaker instance "+id, e);
      return null;
    });
  },

  restart: function(id) {
    return this.putAsync('beaker/instances/' + id, {data: {start: true}})
    .spread(function(responseData, res) {
      return responseData;
    })
  }
});

module.exports = Provisioner;
