module.exports = function() {
  var World = this;
  return this.Widgets.SignInForm = this.Widget.Form.extend({
    root: 'form.sign-in',
    fields: ['email', 'password'],
    ensureNotPresent: function() {
      var _this = this;

      return World.driver.wait(
        (function() {
          return World.W.isPresent(_this.root)
          .then(function(v) { return !v })
          .thenCatch(function(){return true});
        }),
        global.timeout
      );
    }
  });
};
