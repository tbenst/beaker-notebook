module.exports = function() {

  this.Given(/^I'm signed in as a researcher$/, function() {
    var userData  = {
      model: "User",
      data: {
        name: 'joe research',
        email: 'u@r.edu'
      }
    };
    var _this     = this;

    return this.seed(userData).then(function() {
      _this.driver.get(_this.route.signIn);
      return new _this.Widgets.SignInForm().submitWith(userData.data);
    });
  });

};
