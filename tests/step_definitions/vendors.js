var _ = require('lodash');

module.exports = function() {

  this.Given(/^I have the following Vendors:$/, function(vendors) {
    var vendorData = _.map(vendors.hashes(), function(vendor) {
      return {
        model: "Vendor",
        data: vendor
      };
    });

    return this.seed.populate(vendorData);
  });

  this.Given(/^I go to the vendors page$/, function() {
    return this.driver.get(this.route.vendors);
  });

  this.When(/^I create the vendor "([^"]*)"$/, function(vendor) {
    return new this.Widgets.Vendors().create(vendor);
  });

  this.When(/^I delete the vendor "([^"]*)"$/, function(vendor) {
    return new this.Widgets.VendorsList().delete(vendor);
  });

  this.When(/^I rename the vendor "([^"]*)" to "([^"]*)"$/, function(vendor, newName) {
    return new this.Widgets.VendorsList().rename(vendor, newName);
  });

  this.Then(/^the vendor should now be named "([^"]*)"$/, function(vendor) {
    return new this.Widgets.VendorsList().contains(vendor).should.eventually.eql(true);
  });

  this.Then(/^I should see (\d+) vendor(?:|s) in the vendor list$/, function(n) {
    return new this.Widgets.VendorsList().items().should.eventually.have.length(n);
  });

  this.When(/^I enter and clear the vendor name$/, function() {
    return new this.Widgets.Vendors().clearName();
  });

  this.Then(/^I should see an empty vendor name field$/, function() {
    return new this.Widgets.Vendors().nameField().should.eventually.equal('')
  });

};
