module.exports = function() {
  return this.Widgets.ProjectManager = this.Widget.List.extend({
    root: '.projects-root',
    itemSelector: '.project',

    createNew: function() {
      return this.click('.create-project');
    },

    waitForItem: function() {
      return this.find(this.itemSelector);
    },

    clickProject: function(name) {
      var xpath = "return document.evaluate(\"//a[contains(text(),'" + name + "')]\", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0)";
      return this.driver.executeScript(xpath).then(function(a) {
        return a.click();
      });
    }
  });
};
