module.exports = function() {

  this.Given(/^I go to the vendors page$/, function() {
    return this.driver.get(this.route.vendors);
  });

  this.When(/^I enter and clear the vendor name$/, function() {
    return new this.Widgets.Vendors().clearName();
  });

  this.Then(/^I should see an empty vendor name field$/, function() {
    return new this.Widgets.Vendors().nameField().should.eventually.equal('')
  });

};
