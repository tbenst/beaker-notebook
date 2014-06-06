var _         = require("lodash");
var bluebird  = require("bluebird");

module.exports = function() {
  return this.Widgets.MarketSelectFilterBase = this.Widget.extend({
    getSelectedTags: function() {
      return this.findAll(".selected");
    },

    showDropdown: function() {
      // simulate hover
      var method = "Sizzle('"+this.root+" ul')[0].style.display = 'block';";
      return this.driver.executeScript(method).then(
        this.waitForTag.bind(this));
    },

    waitForTag: function() {
      return this.find('ul li');
    },

    selectMatching: function(tags) {
      var _this = this;

      return this.showDropdown().then(function() {
        return $.map(tags, function(tag) {
          var method = "return Sizzle('"+_this.root+" ul li:contains(\""+tag+"\") a')[0]";

          return _this.driver.executeScript(method).then(function(elm) {
            elm.click();
          })
        });
      })
    }
  });
}
