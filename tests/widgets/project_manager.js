module.exports = function() {
  var World = this;

  return this.Widgets.ProjectManager = this.Widget.List.extend({
    root: '.projects-root',
    itemSelector: '.project',
    projectsSidebarHeader: '.project-sidebar .sidebar-box h3 .dropdown-toggle',

    createNew: function() {
      var _this = this;

      return this.find(this.projectsSidebarHeader).then(function(el) {
        return new World.Widgets.Dropdown().show(el)
        .then(function() {
          return _this.click(".create-project");
        });
      });
    },

    waitForItem: function() {
      return this.items();
    },

    clickProject: function(name) {
      var xpath = "return document.evaluate(\"//a[contains(text(),'" + name + "')]\", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)";
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
