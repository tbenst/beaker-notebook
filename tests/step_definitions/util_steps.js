var Bluebird  = require("bluebird");

module.exports = function() {
  this.Then(/^freeze (\d+)$/, function(seconds) {
    return Bluebird.delay((seconds || 1000) * 1000);
  });
}
