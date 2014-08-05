var _  = require('lodash');
var Promise = require('bluebird');
var Docker = require('dockerode');

Promise.promisifyAll(require('dockerode/lib/docker').prototype);
Promise.promisifyAll(require('dockerode/lib/container').prototype);

function DockerProvisioner(options) {
  _.extend(this, {
    docker: new Docker(options)
  });
}

_.extend(DockerProvisioner.prototype, {
  provision: function() {
    return this.docker.createContainerAsync({
      'Image': 'bunsen_beaker',
      'ExposedPorts': {'8801/tcp': {}}
    })
    .then(function(container) {
      // By not specyfying the host port when starting a container, we allow Docker to dynamically pick
      // a free port available in the range 49153-65535
      return container.startAsync({'PortBindings': {'8801/tcp': [{}]}})
      .then(function() {
        return inspectContainer(container);
      });
    });
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
      port: data.HostConfig.PortBindings['8801/tcp'][0]['HostPort']
    }
  });
}

module.exports = DockerProvisioner;
