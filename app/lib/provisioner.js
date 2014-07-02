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
      return data;
    })
  }
});

module.exports = Provisioner;
