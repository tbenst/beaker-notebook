var assert  = require("assert"),
    _       = require('lodash');
module.exports = function() {
  var u = this.user;

  var userData  = {
    'name': 'john admin',
    'email': 'r@u.edu',
    'password': 'password',
    'role': this.USER_ROLE['administrator'],
    'job-title': 'Admin',
    'company': 'Two Sigma',
    'bio': 'Keeping these parts safe'
  };

  this.Given(/^I'm signed in as an administrator$/, function() {
    var _this = this;
    return u.createUser(userData).then(function() {
      return _this.driver.get(_this.route.signIn).then(function() {
        return new _this.Widgets.SignInForm().submitWith(_.pick(userData, 'email', 'password'));
      });
    })
    .then(function() {
      return new _this.Widgets.SignInForm().ensureNotPresent();
    })
  });

  this.Given(/^I go to the admin page$/, function() {
    return this.driver.get(this.route.admin);
  });

  this.Then(/^I should see the Admin Panel heading$/, function() {
    var admin = new this.Widgets.Admin();
    return admin.getHeader().should.eventually.eql("Admin Panel");
  });
};
