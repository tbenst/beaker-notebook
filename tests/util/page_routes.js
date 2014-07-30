var util = require('util');

module.exports = function() {
  var config = this.config.frontend;

  this.route = {
    home: config.url,
    signIn: config.url+"#/sign_in",
    market: config.url+"#/market_place",
    subscriptions: config.url+"#/subscriptions",
    publications: config.url+"#/publications",
    projectDashboard: config.url + "#/projects",
    forProject: function(project) {
      return util.format('%s#/projects/%s', config.url, project.id);
    }
  };
};
