var util = require('util');
var config = require('./_config');

module.exports = function() {
  var base = config.bunsenUrl;

  this.route = {
    home: base,
    signIn: base+"#/sign_in",
    beakerSignIn: base+"publications.html#/sign_in",
    beakerSignUp: base+"publications.html#/sign_up",
    market: base+"#/market_place",
    subscriptions: base+"#/subscriptions",
    publications: base+"#/publications",
    beakerPublications: base+"publications.html#/publications",
    projectDashboard: base + "#/projects",
    userEdit: base + "#/user_edit",
    admin: base + "#/admin",
    datasetCreate: base + "#/admin/datasets/create",
    vendors: base + "#/admin/vendors",
    forProject: function(project) {
      return util.format('%s#/projects/%s', base, project.id);
    }
  };
};
