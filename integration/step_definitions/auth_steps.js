module.exports = function() {

  this.Given(/^I'm signed in as a researcher$/, function() {
    var userData = [{name: 'joe research', email: 'u@r.edu', id: 1}];
    this.seed('User', userData).then(_.bind(function() {
      this.driver.get(this.config.frontend.url);
    }, this));
  });

};
