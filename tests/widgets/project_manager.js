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
      var method = "return Sizzle('" + this.root + " a:contains(\"" + name + "\")')[0].click()";
      return this.driver.executeScript(method);
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
