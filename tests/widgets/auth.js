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

  this.Widgets.SignUpMessage = this.Widget.extend({
    root: 'sign-up .message'
  });

  this.Widgets.SignIn = this.Widget.extend({
    root: '.auth.sign-in',
    switchToSignUp: function() {
      return this.click('.sub-action .create-account');
    },
  });

  return this.Widgets.SignInMessage= this.Widget.extend({
    root: 'sign-in .message'
  });
};
