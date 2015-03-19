var _ = require('lodash')
var Provisioner = require('../lib/provisioner');

module.exports = function(app) {
  var User = app.Models.User
      config = app.config;

  var provisioner = new Provisioner(config.provisioner)

  var setcookie = function(req,res) {
    var defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 31);
    res.cookie('beakerauth',req.user.get('beakerPassword'), { expires: defaultDate });
  }
  
  return {
    create: function(req, res, next) {
      req.user.beakerConfig()
      .then(provisioner.provision.bind(provisioner))
      .then(function() {
        setcookie(req,res);
        res.json(req.user.beakerUrl())
      })
      .catch(next);
    },

    get: function(req, res, next) {
      provisioner.inspect(req.user.id)
      .then(function(instance) {
        setcookie(req,res);
        res.json(instance)
      })
      .catch(next);
    }
  };
};
