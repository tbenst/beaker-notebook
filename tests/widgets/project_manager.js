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

    itemNames: function() {
      return this.invoke('read');
    }
  });
};
