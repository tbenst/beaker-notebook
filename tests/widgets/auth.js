module.exports = function() {
  var World = this;
  this.Widgets.SignInForm = this.Widget.Form.extend({
    root: 'form.sign-in',
    fields: ['email', 'password'],
  });

  this.Widgets.SignUpForm = this.Widget.Form.extend({
    root: 'form.sign-up',
    fields: ['name', 'email', 'password'],
  });

  return this.Widgets.SignInMessage= this.Widget.extend({
    root: 'sign-in .message'
  });
};
