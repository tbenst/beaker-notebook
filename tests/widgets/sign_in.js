module.exports = function() {
  return this.Widgets.SignInForm = this.Widget.Form.extend({
    root: 'form.sign-in',
    fields: ['email']
  });
};
