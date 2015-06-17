var Promise = require('bluebird');
var _ = require('lodash');

module.exports = function() {
  this.When(/^I view the Beaker publications page$/, function() {
    return this.driver.get(this.route.beakerPublications);
  });
}
