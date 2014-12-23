// See: https://github.com/petkaantonov/bluebird/blob/master/API.md#promisepromisifyallobject-target--object-options---object
// for the original implementation.

var Promise = require("bluebird");
var restler = require("restler");
var service = restler.Service;
var methodNamesToPromisify = "get post put del head patch json postJson putJson".split(" ");

function EventEmitterPromisifier(originalMethod) {
  return function() {
    var args = [].slice.call(arguments);
    var _this = this;
    return new Promise(function(resolve, reject) {
      var emitter = originalMethod.apply(_this, args);
      emitter
        .on("success", function(data, response) {
          resolve([data, response]);
        })
        .on("fail", function(data, response) {
          reject(new Error("Response code " + response.statusCode));
        })
        .on("error", function(err) {
          reject(err);
        })
        .on("abort", function() {
          reject(new Promise.CancellationError());
        })
        .on("timeout", function() {
          reject(new Promise.TimeoutError());
        });
    });
  };
};

Promise.promisifyAll(restler.Service.prototype, {
  filter: function(name) {
    return methodNamesToPromisify.indexOf(name) > -1;
  },
  promisifier: EventEmitterPromisifier
});

module.exports = restler;
