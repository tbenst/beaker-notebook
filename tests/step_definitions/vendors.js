module.exports = function() {

  this.Given(/^I go to the vendors page$/, function() {
    return this.driver.get(this.route.vendors);
  });

 this.When(/^I cancel creating a vendor$/, function() {
    return new this.Widgets.Vendors().cancelCreation();
 });

};
