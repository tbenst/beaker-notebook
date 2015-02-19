var assert  = require("assert"),
    _       = require('lodash');
module.exports = function() {

  var userData  = {
    model: "User",
    data: {
      name: 'john admin',
      email: 'r@u.edu',
      password: 'password',
      beaker_password: 'bdcd4dc234eaddac4fc036c27dafa74727e756e0',
      job_title: 'Admin',
      company: 'Two Sigma',
      bio: 'Keeping these parts safe',
      role: this.USER_ROLE['administrator']
    }
  };

  this.Given(/^I'm signed in as an administrator$/, function() {
    var _this = this;
    return this.seed.populate(userData).then(function() {
      return _this.driver.get(_this.route.signIn).then(function() {
        return new _this.Widgets.SignInForm().submitWith(_.pick(userData.data, 'email', 'password'));
      });
    })
    .then(function() {
      return new _this.Widgets.SignInForm().ensureNotPresent();
    })
  });

  this.Given(/^I go to the admin page$/, function() {
    return this.driver.get(this.route.admin);
  });

  this.Then(/^I should see the header Admin Panel$/, function() {
    var admin = new this.Widgets.Admin();
    return admin.getHeader().should.eventually.eql("Admin Panel");
  });
};
