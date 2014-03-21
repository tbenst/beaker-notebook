module.exports = function() {

  this.Given(/^I'm signed in as a researcher$/, function() {
    var userData = {name: 'joe research', email: 'u@r.edu', id: 1};
    this.seed('User', userData).then(
      this.driver.get.bind(this.driver, this.route.home));
  });

};
