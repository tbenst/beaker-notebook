var _ = require('lodash')
var Provisioner = require('../lib/provisioner');
var url = require('url');

module.exports = function(app) {
  var BeakerClaim = app.Models.BeakerClaim,
      User = app.Models.User
      config = app.config;

  var provisioner = new Provisioner(config.provisioner)

  return {
    create: function(req, res, next) {
      req.user.beakerClaim().fetch()
      .then(function(beaker) {
        if (beaker) {
          res.statusCode = 409;
          throw new Error('Beaker instance is already running');
        } else {
          return provisioner.provision()
          .then(function(instance) {
            return BeakerInstance.forge({
              userId: req.user.id,
              containerId: instance.id
            }).save()
            .then(function() {
              return beakerResponse(instance);
            });
          })
        }
      })
      .then(res.json.bind(res))
      .catch(next);
    },

    get: function(req, res, next) {
      req.user.beakerClaim().fetch()
      .then(function(beaker) {
        if (!beaker) {
          res.statusCode = 404;
          throw new Error('Beaker instance not found');
        } else {
          return provisioner.inspect(beaker.get('containerId'));
        }
      })
      .then(function(instance) {
        res.json(beakerResponse(instance))
      })
      .catch(next);
    }
  };

  function beakerUrl(port) {
    return url.format({protocol: 'http',
      hostname: config.beakerHost,
      port: port,
      pathname: '/beaker/'
    });
  }

  function beakerResponse(data) {
    return _.merge(data, {url: beakerUrl(data.id)})
  }

  function noInstanceResponse(res) {
    res.statusCode = 404;
    throw new Error('You do not have a running beaker instance.');
  }

  function provisionNewInstance(req) {
    return provisioner.provision()
    .then(function(instance) {
      return BeakerClaim.forge({
        userId: req.user.id,
        containerId: instance.id
      }).save()
      .then(function() {
        return beakerResponse(instance);
      });
    });
  }
};
