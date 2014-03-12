var request = require('request');
var util = require('util');

module.exports = function() {

  var config = this.config.appServer;

  var seedRequest = function(httpMethod, path, jsonBody) {
    var reqUrl = util.format('http://%s:%s/seeds/%s',
      config.host, config.port, path);
    var reqConfig = {uri: reqUrl};
    if (jsonBody !== undefined) {
      reqConfig.json = jsonBody;
    }
    return request.$(httpMethod, reqConfig).then(
      function(response, body) {
        if (response.statusCode == 200) {
          return body;
        }
        else {
          throw Error("Status code " + response.statusCode + " from app seed request.  Body of response: " + body);
        }
      },
      function(error) {
        console.log("App seed request failed: ", error);
        throw error;
      });
  };

  this.Before(function() {
    return seedRequest('del', '');
  });

  this.seed = function(modelName, modelData) {
    return seedRequest('post', modelName, modelData);
  };

};
