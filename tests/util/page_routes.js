var util = require('util');
var config = require('./_config');

module.exports = function() {
  var base = config.bunsenUrl;

  this.route = {
    home: base,
    signIn: base+"#/sign_in",
    market: base+"#/market_place",
    subscriptions: base+"#/subscriptions",
    publications: base+"#/publications",
    projectDashboard: base + "#/projects",
    forProject: function(project) {
      return util.format('%s#/projects/%s', base, project.id);
    }
  };
};
