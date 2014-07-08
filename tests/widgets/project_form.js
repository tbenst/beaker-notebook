module.exports = function() {
  var World = this;
  return this.Widgets.ProjectForm = this.Widget.Form.extend({
    root: '.projects-root',
    fields: ['name', 'description'],
    projectMenu: '.project-menu',

    goToDelete: function() {
      return new World.Widgets.Dropdown().show(this.projectMenu).then(function() {
        return this.click(".delete-project");
      }.bind(this));
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
