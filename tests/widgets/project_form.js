module.exports = function() {
  return this.Widgets.ProjectForm = this.Widget.Form.extend({
    root: '.projects-root',
    fields: ['name', 'description'],
    delete: function() {
      return this.click('.delete-project');
    },
    submitSelector: function() {
      return '.update-project'
    }
  });
};
