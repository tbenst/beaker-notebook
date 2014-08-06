var _  = require('lodash');
var Promise = require('bluebird');
var Docker = require('dockerode');

var BEAKER_PORT = '8801/tcp';
var BEAKER_IMAGE = process.env.BEAKER_IMAGE;

Promise.promisifyAll(require('dockerode/lib/docker').prototype);
Promise.promisifyAll(require('dockerode/lib/container').prototype);

function DockerProvisioner(options) {
  _.extend(this, {
    docker: new Docker(options)
  });
}

_.extend(DockerProvisioner.prototype, {
  provision: function() {
    var _this = this;

    if (process.env['NODE_ENV'] != 'test') {
      var exposedPorts = {};
      exposedPorts[BEAKER_PORT] = {};
      return this.docker.createContainerAsync({
        'Image': BEAKER_IMAGE,
        'ExposedPorts': exposedPorts
      })
      .then(function(container) {
        // By not specyfying the host port when starting a container, we allow Docker to dynamically pick
        // a free port available in the range 49153-65535
        var portBindings = {};
        portBindings[BEAKER_PORT] = [{}];
        return container.startAsync({'PortBindings': portBindings})
        .then(function() {
          return inspectContainer(container);
        });
      });
    } else {
      // We don't provision new instances in 'test' environment,
      // but we share the instance started by fig between all users
      return this.docker.listContainersAsync()
      .then(function(list) {
        var container = _.findWhere(list, {Image: BEAKER_IMAGE+':latest'})
        return container.Id;
      })
      .then(_this.inspect.bind(_this));
    }
  },

  inspect: function(id) {
    var c = this.docker.getContainer(id);
    return inspectContainer(c);
  },
});

function inspectContainer(container) {
  return container.inspectAsync()
  .then(function(data) {
    return {
      id: data.Id,
      port: data.HostConfig.PortBindings[BEAKER_PORT][0]['HostPort'],
      running: data.State.Running
    }
  });
}

module.exports = DockerProvisioner;
