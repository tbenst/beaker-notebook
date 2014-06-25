var _ = require("lodash");

module.exports = function() {
  this.Given(/^I view My Datasets$/, function() {
    return this.driver.get(this.route.subscriptions);
  });

  this.Then(/^I should see the "([^"]*)" dataset$/, function(title) {
    return new this.Widgets.SubscriptionList().hasDataset(title).should.eventually.be.true;
  });

  this.Then(/^I should see the following datasets:$/, function(table) {
    var subscriptions = new this.Widgets.SubscriptionList();
    var expectedTitles = _.pluck(table.hashes(), 'title');
    var expectedDescriptions = _.pluck(table.hashes(), 'description');
    var expectedLocations = _.map(table.hashes(), function(r) { return '/var/s3/' + r.remoteFile; });

    return subscriptions.titles().should.eventually.deep.equal(expectedTitles).then(function() {
      subscriptions.descriptions().should.eventually.deep.equal(expectedDescriptions);
    }).then(function() {
      subscriptions.locations().should.eventually.deep.equal(expectedLocations);
    });
  });

  this.When(/^I view the "([^"]*)" dataset$/, function(title) {
    return new this.Widgets.SubscriptionList().clickOn(title);
  });

  this.Then(/^I should see the "([^"]*)" dataset in the marketplace$/, function(title) {
    return new this.Widgets.MarketItem().title().should.eventually.equal(title);
  });
};
