module.exports = function() {
  return this.Widgets.ProjectForm = this.Widget.Form.extend({
    root: '.project-form',
    fields: ['name', 'description']
  });
};
