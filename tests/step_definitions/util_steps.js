var Bluebird  = require("bluebird");

module.exports = function() {
  this.Then(/^freeze$/, function(seconds) {
    return Bluebird.delay(1000 * 1000);
  });
  this.Then(/^freeze (\d+)$/, function(seconds) {
    return Bluebird.delay((seconds || 1000) * 1000);
  });
  this.When(/^I refresh the page$/, function() {
    return this.driver.navigate().refresh();
  });
}
