var Bluebird    = require('bluebird');

module.exports = function() {
  this.AfterAll(function() {
    // post back to the front_end server to report coverage
    var _this = this;
    return this.driver.executeScript('angular.element(document).injector().get("$http").post("/api/coverage/client", JSON.stringify(window.__coverage__));')
      .then(function() {
	return _this.driver.sleep(100);
      });
  });
};
