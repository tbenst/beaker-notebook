var bluebird  = require("bluebird")

module.exports = function() {
  return this.Widgets.MarketTagFilter = this.Widget.extend({
    root: 'select.tags',

    selectMatchingTags: function(tags) {
      var _this = this;

      return bluebird.map(tags, function(tag) {
        var method = "return document.evaluate('//option[text()=\""+tag+"\"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0).setAttribute('selected', 'selected')";
        return _this.driver.executeScript(method);
      })
    }
  });
};
