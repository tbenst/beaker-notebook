module.exports = function() {

  this.Given(/^I'm signed in as a researcher$/, function() {
    this.seed('User', userData).then(_.bind(function() {
    }, this));
    var userData = {name: 'joe research', email: 'u@r.edu', id: 1};
      this.driver.get(this.route.home);
  });

};
