var assert  = require("assert"),
    _       = require('lodash');
module.exports = function() {
  var u = this.user;

  var userData  = {
    'name': 'john admin',
    'email': 'r@u.edu',
    'password': 'password',
    'roles': ['bunsen', 'admin'],
    'job-title': 'Admin',
    'company': 'Two Sigma',
    'bio': 'Keeping these parts safe'
  };

  this.Given(/^I'm signed in as an administrator$/, function() {
    var _this = this;
    return u.createUser(userData)
      .then(function() {
        return _this.driver.get(_this.route.signIn);
      })
      .then(function() {
        return new _this.Widgets.SignInForm().submitWith(_.pick(userData, 'email', 'password'));
      })
      .then(function() {
        return new _this.Widgets.AppHeader().ensureSignedIn();
      })
  });

  this.Given(/^I go to the admin page$/, function() {
    return new this.Widgets.MainNav().visitAdmin();
  });

  this.Then(/^I should see the Admin Panel heading$/, function() {
    var admin = new this.Widgets.Admin();
    return admin.getHeader().should.eventually.eql("Admin Panel");
  });
};
