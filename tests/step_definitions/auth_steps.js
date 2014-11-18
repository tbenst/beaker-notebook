var assert  = require("assert"),
    _       = require('lodash');
module.exports = function() {

  var userData  = {
    model: "User",
    data: {
      name: 'joe research',
      email: 'u@r.edu',
      password: 'password',
      job_title: 'Researcher',
      company: 'Two Sigma',
      bio: 'I got data all around me'
    }
  };

  this.Given(/^I'm signed in as a researcher$/, function() {
    var _this = this;
    return this.seed.populate(userData).then(function() {
      return _this.driver.get(_this.route.signIn).then(function() {
        return new _this.Widgets.SignInForm().submitWith(_.pick(userData.data, 'email', 'password'));
      });
    })
    .then(function() {
      return new _this.Widgets.SignInForm().ensureNotPresent()
    })
  });

  this.Given(/^I signed up as a researcher$/, function() {
    var _this = this;
    return this.seed.populate(userData).then(function() {
      return _this.driver.get(_this.route.home);
    });
  });

  this.Given(/^I'm not signed in$/, function() {
    return this.driver.get(this.route.home);
  });

  this.When(/^I go to the sign in page$/, function() {
    return this.driver.get(this.route.signIn);
  });

  this.When(/^I go to the edit user page$/, function() {
    return this.driver.get(this.route.userEdit);
  });

  this.When(/^I fill in the edit user form with:$/, function(table) {
    return new this.Widgets.EditUserForm().submitWith(table.hashes()[0]);
  });

  this.When(/^I should see an error message of "([^"]*)"$/, function(message) {
    return new this.Widgets.EditUserMessage().getMessage()
      .should.eventually.eql(message);
  });

  this.When(/^I fill in the sign in form with:$/, function(table) {
    return new this.Widgets.SignInForm().submitWith(table.hashes()[0]);
  });

  this.Then(/^I should see the header greeting "([^"]*)"$/, function(expected) {
    var appHeader = new this.Widgets.AppHeader();
    return appHeader.getCurrentUserName().should.eventually.eql(expected)
  });

  this.When(/^I click the sign out link$/, function() {
    return new this.Widgets.AppHeader().signOut();
  });

  this.Then(/^I should see I've been signed out$/, function() {
    var signedOut = new this.Widgets.SignedOut();

    return signedOut.getMessage().then(function(msg) {
      return assert.equal(msg, "You've been signed out.");
    });
  });

  this.Then(/^I should see the sign in form$/, function() {
    var signInForm = new this.Widgets.SignInForm()
    return signInForm.isPresent().should.eventually.equal(true);
  });

  this.Then(/^I should see navigation$/, function() {
    return new this.Widgets.MainNav().navList().then(function(nav) {
      return nav.isDisplayed().should.eventually.be.true;
    });
  });

  this.Then(/^I shouldn't see navigation$/, function() {
    return new this.Widgets.MainNav().navList().then(function(nav) {
      return nav.isDisplayed().should.eventually.be.false;
    });
  });
};
