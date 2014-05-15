module.exports = function() {
  this.Then(/^I should see the marketplace menu item active$/, function() {
    return new this.Widgets.ActivePage().isMarketPlaceActive();
  });

  this.Then(/^I should see the projects menu item active$/, function() {
    return new this.Widgets.ActivePage().isProjectActive();
  });
}
