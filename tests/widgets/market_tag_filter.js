var _         = require("lodash");
var bluebird  = require("bluebird");

module.exports = function() {
  return this.Widgets.MarketTagFilter = this.Widget.extend({
    root: 'select.tags',

    getSelectedTags: function() {
      return this.findAll("option[selected='selected']");
    },

    selectMatchingTags: function(tags) {
      var _this = this;

      return bluebird.map(tags, function(tag) {
        var method = "return document.evaluate('//option[text()=\""+tag+"\"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0).getAttribute('value')";
        return _this.driver.executeScript(method);
      }).then(function(tagIDs) {
        return bluebird.map(tagIDs, function(id) {
          return _this.click("[value='"+id+"']");
        });
      });
    }
  });
};
