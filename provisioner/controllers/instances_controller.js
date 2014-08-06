var DockerProvisioner = require('../lib/docker_provisioner');
var NoSuchInstance = require("../lib/no_such_instance");

module.exports = function(app) {
  var provisioner = new DockerProvisioner({socketPath: '/var/run/docker.sock'});

  return {
    create: function(req, res, next) {
      provisioner.provision().then(function(instance) {
        res.json(instance);
      }).catch(next);
    },

    get: function(req, res, next) {
      provisioner.inspect(req.params.id).then(function(instance) {
        res.json(instance);
      }).catch(function(e) {
        if (e instanceof NoSuchInstance) {
          res.statusCode = 404;
        }
        next(e);
      });
    },

    update: function(req, res, next) {
      console.log("update body", req.body);
      if (req.body.start != 'true') {
        throw Error('Currently, starting is the only way to modify an existing container.')
      }
      provisioner.restart(req.params.id).then(function(instance) {
        res.json(instance);
      }).catch(next);
    },

  };
};
