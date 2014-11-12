var _ = require('lodash')
var Provisioner = require('../lib/provisioner');

module.exports = function(app) {
  var User = app.Models.User
      config = app.config;

  var provisioner = new Provisioner(config.provisioner)

  return {
    create: function(req, res, next) {
      provisioner.provision(req.user.id)
      .then(function(instance) {
        res.json(beakerResponse(instance))
      })
      .catch(next);
    },

    get: function(req, res, next) {
      provisioner.inspect(req.user.id)
      .then(function(instance) {
        res.json(beakerResponse(instance))
      })
      .catch(next);
    }
  };

  function beakerUrl(cid) {
    return '/beaker/' + cid + '/beaker/';
  }

  function beakerResponse(data) {
    return _.merge(data, {url: beakerUrl(data.id)})
  }
};
