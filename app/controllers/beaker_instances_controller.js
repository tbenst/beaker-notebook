var _ = require('lodash')
var Provisioner = require('../lib/provisioner');

module.exports = function(app) {
  var User = app.Models.User
      config = app.config;

  var provisioner = new Provisioner(config.provisioner)

  return {
    create: function(req, res, next) {
      req.user.beakerConfig()
      .then(provisioner.provision.bind(provisioner))
      .then(function() {
        res.json(req.user.beakerUrl())
      })
      .catch(next);
    },

    get: function(req, res, next) {
      provisioner.inspect(req.user.id)
      .then(function(instance) {
        res.json(instance)
      })
      .catch(next);
    }
  };
};
