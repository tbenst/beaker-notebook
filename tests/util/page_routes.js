var util = require('util');

module.exports = function() {
  var config = this.config.frontend;

  this.route = {
    home: config.url,
    signIn: config.url+"#/sign_in",
    market: config.url+"#/market_place",

    forProject: function(project) {
      return util.format('%s#/projects/%s', config.url, project.id);
    }
  };
};
