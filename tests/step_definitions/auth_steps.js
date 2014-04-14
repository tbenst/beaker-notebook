var assert = require("assert");

module.exports = function() {

  var userData  = {
    model: "User",
    data: {
      name: 'joe research',
      email: 'u@r.edu'
    }
  };

  this.Given(/^I'm signed in as a researcher$/, function() {
    var _this = this;
    return this.seed(userData).then(function() {
      return _this.driver.get(_this.route.signIn).then(function() {
        return new _this.Widgets.SignInForm().submitWith(userData.data);
      });
    });
  });

  this.Given(/^I signed up as "([^"]*)"$/, function(email) {
    var _this = this;
    return this.seed(_.extend({data: {email: email}}, userData)).then(function() {
      return _this.driver.get(_this.route.home);
    });
  });

  this.Given(/^I'm not signed in$/, function() {
    return this.driver.get(this.route.home);
  });

  this.When(/^I go to the sign in page$/, function() {
    return this.driver.get(this.route.signIn);
  });

  this.When(/^I fill in the sign in form with:$/, function(table) {
    return new this.Widgets.SignInForm().submitWith(table.hashes()[0]);
  });

  this.Then(/^I should see I'm signed in as "([^"]*)"$/, function(expected) {
    var authControls = new this.Widgets.AuthControls();

    return authControls.getCurrentUserEmail().then(function(email) {
      return assert.equal(email, expected);
    });
  });

  this.When(/^I click the sign out link$/, function() {
    return new this.Widgets.AuthControls().signOut();
  });

  this.Then(/^I should see I've been signed out$/, function() {
    var signedOut = new this.Widgets.SignedOut();

    return signedOut.getMessage().then(function(msg) {
      return assert.equal(msg, "You've been signed out.");
    });
  });

  this.When(/^I go to my projects$/, function() {
    var mainNav = new this.Widgets.MainNav();
    return mainNav.visitProjects()
  });

  this.Then(/^I should see the sign in form$/, function() {
    var signInForm = new this.Widgets.SignInForm()
    return signInForm.isPresent().should.eventually.equal(true);
  });
};
