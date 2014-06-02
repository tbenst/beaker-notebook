module.exports = function() {
  var World = this;

  return this.Widgets.ProjectManager = this.Widget.List.extend({
    root: '.projects-root',
    itemSelector: '.project',
    createNewDropdown: '.nav .basic-drop-down',

    createNew: function() {
      return new World.Widgets.ShowDropdown().show(this.createNewDropdown).then(function() {
        return this.click(".create-project");
      }.bind(this));
    },

    waitForItem: function() {
      return this.find(this.itemSelector);
    },

    clickProject: function(name) {
      var xpath = "return document.evaluate(\"//a[contains(text(),'" + name + "')]\", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0)";
      return this.driver.executeScript(xpath).then(function(a) {
        return a.click();
      });
    },

    itemNames: function() {
      return this.findAll(this.itemSelector).then(function(nodes) {
        return $.map(nodes, function(n) {
          return n.getInnerHtml();
        });
      });
    }
  });
};
