module.exports = function() {
  this.Then(/^I should see the "([^"]*)" menu item active$/, function(tabName) {
    return new this.Widgets.ActivePage().isTabActive(tabName);
  });

  this.Then(/^I click the header logo$/, function() {
    return new this.Widgets.AppHeader().clickLogo();
  });
}
