module.exports = function() {
  return this.Widgets.TabList = this.Widget.List.extend({
    root: '.tabs',

    clickTab: function(tab) {
      var xpath = "return document.evaluate(\"//li[contains(text(),'" + tab + "')]\", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)";
      return this.driver.executeScript(xpath).then(function(li) {
        return li.click();
      });
    }
  });
}
