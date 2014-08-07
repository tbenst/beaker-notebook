var _ = require('lodash')
var Provisioner = require('../lib/provisioner');

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
          cid = beaker.get('containerId');
          return provisioner.inspect(cid).then(function(data) {
            if (!data) {
              return beaker.destroy().then(function() {
                return provisionNewInstance(req);
              });
            }
            else if (data.running) {
              res.statusCode = 409;
              throw new Error('Beaker instance is already running');
            }
            else {
              return provisioner.restart(cid).then(function(restartedData) {
                return beakerResponse(restartedData);
              });
            }
          });
        } else {
          return provisionNewInstance(req);
        }
      })
      .then(res.json.bind(res))
      .catch(next);
    },

    get: function(req, res, next) {
      req.user.beakerClaim().fetch()
      .then(function(beaker) {
        if (!beaker) {
          return noInstanceResponse(res);
        } else {
          return provisioner.inspect(beaker.get('containerId')).then(function(data) {
            if (data && data.running) {
              return data;
            } else {
              return noInstanceResponse(res);
            }
          });
        }
      })
      .then(function(instance) {
        res.json(beakerResponse(instance))
      })
      .catch(next);
    }
  };

  function beakerUrl(cid) {
    return '/beaker/' + cid.substring(0, 12) + '/beaker/';
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
