module.exports = function() {
  var World = this;
  return this.Widgets.SignInForm = this.Widget.Form.extend({
    root: 'form.sign-in',
    fields: ['email', 'password'],
  });
};
