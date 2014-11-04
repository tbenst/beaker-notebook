module.exports = function() {
  this.When(/^I navigate to the landing page$/, function() {
    return this.driver.get(this.route.home);
  });

  this.Then(/^I should see a welcome message$/, function() {
    return new this.Widgets.LandingPage().welcomeMessage().then(function(welcome) {
      return welcome.isDisplayed().should.eventually.be.true;
    });
  });
}
