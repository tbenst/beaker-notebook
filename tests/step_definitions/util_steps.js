var Bluebird  = require("bluebird");

module.exports = function() {
  this.Then(/^freeze$/, function() {
    return Bluebird.delay(5 * 60 * 1000);
  });
}
