module.exports = function() {
  var World = this;
  return this.Widgets.ProjectForm = this.Widget.Form.extend({
    root: '.projects-root',
    fields: ['name', 'description'],
    projectMenu: '.project-menu',

    delete: function() {
      return new World.Widgets.ShowDropdown().show(this.projectMenu).then(function() {
        return this.click(".delete-project");
      }.bind(this));
    },
    submitSelector: function() {
      return '.update-project'
    }
  });
};
