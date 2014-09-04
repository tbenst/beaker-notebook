var _  = require('lodash');
var Promise = require('bluebird');
var Docker = require('dockerode');
var Uuid = require('node-uuid');
var NoSuchInstance = require("../lib/no_such_instance");

var BEAKER_PORT = '8801/tcp';
var BEAKER_IMAGE = process.env.BEAKER_IMAGE;
// in inspect API, docker prepends a / to names to denote Docker Daemon itself
var BEAKER_CONTAINER_PATTERN = '/' + process.env.BEAKER_CONTAINER_PATTERN;

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
        'name': (BEAKER_CONTAINER_PATTERN + Uuid.v4()),
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
        var container = _.find(list, function(c) {
          return _.include(c.Names, BEAKER_CONTAINER_PATTERN);
        });
        return container.Id;
      })
      .then(_this.inspect.bind(_this));
    }
  },

  inspect: function(id) {
    var c = this.docker.getContainer(id);
    return inspectContainer(c);
  },

  restart: function(id) {
    var c = this.docker.getContainer(id);
    console.log("container", c);
    return c.inspectAsync().then(function(data) {
      if (data.State.Running == true) {
        throw new Error("Container " + id + " is already running.");
      }
      if (data.Name.indexOf(BEAKER_CONTAINER_PATTERN) != 0) {
        throw new Error("Container " + id + " is not a beaker container, it's " + data.Name);
      }
      return c.startAsync().then(function() {
        return inspectContainer(c);
      });
    });
  }

});

function inspectContainer(container) {
  return container.inspectAsync()
  .then(function(data) {
    return {
      id: data.Id,
      port: data.HostConfig.PortBindings[BEAKER_PORT][0]['HostPort'],
      running: data.State.Running
    }
  }).catch(function(e) {
    if (e.cause && e.cause.statusCode && e.cause.statusCode == 404) {
      throw new NoSuchInstance(e.message);
    }
    else {
      throw e;
    }
  });
}

module.exports = DockerProvisioner;
