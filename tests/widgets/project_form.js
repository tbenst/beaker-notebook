module.exports = function() {
  var World = this;
  return this.Widgets.ProjectForm = this.Widget.Form.extend({
    root: '.projects-root',
    fields: ['name', 'description'],
    projectMenu: '.project-menu .dropdown-toggle',

    goToDelete: function() {
      var _this = this;

      return this.find(this.projectMenu)
      .then(function(el) {
        return new World.Widgets.Dropdown().show(el)
        .then(function() {
          return _this.click(".delete-project");
        });
      });
    },

    delete: function() {
      return this.goToDelete().then(function() {
        return new World.Widgets.Modal().accept();
      });
    },

    submitSelector: function() {
      return '.update-project'
    }
  });
};
