module.exports = function() {
  return this.Widgets.EditUserForm = this.Widget.Form.extend({
    root: 'form.user-edit',
    fields: ['name', 'email', 'currentPassword', 'newPassword']
  });
};
