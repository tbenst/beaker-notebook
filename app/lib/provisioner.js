var restler = require('./promising_restler');
var url = require('url');

Provisioner = restler.service(function(options) {
  this.baseURL = url.format({protocol: 'http',
    hostname: options.host,
    port: options.port
  });
}, null, {
  provision: function(id) {
    return this.jsonAsync('POST', 'api/v1/instance', {id: id})
    .spread(function(data, res) {
      return data;
    })
  },

  inspect: function(id) {
    return this.getAsync('api/v1/instance/' + id).spread(function(data, res) {
      if (res.statusCode == 404) {
        return null;
      }
      return data;
    }).catch(function(e) {
      console.log("Failed to inspect beaker instance "+id, e);
      return null;
    });
  }
});

module.exports = Provisioner;
