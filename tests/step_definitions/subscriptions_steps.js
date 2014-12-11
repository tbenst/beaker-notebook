var _ = require("lodash");
var Promise = require('bluebird');

module.exports = function() {
  this.Given(/^I view My Datasets$/, function() {
    return this.driver.get(this.route.subscriptions);
  });

  this.When(/^I search my subscriptions for "([^"]*)"$/, function(query) {
    return new this.Widgets.SubscriptionSidebar().search(query);
  });

  this.When(/^I (un)?sort by subscription date$/, function() {
    return new this.Widgets.SubscriptionSidebar().toggleSortBySubscriptionDate();
  });

  this.Then(/^I should see the "([^"]*)" dataset$/, function(title) {
    return new this.Widgets.SubscriptionList().hasDataset(title).should.eventually.be.true;
  });

  this.Then(/^I should see the following subscriptions:$/, function(table) {
    var subscriptions = new this.Widgets.SubscriptionList();
    var expectedTitles = _.pluck(table.hashes(), 'title');
    var expectedDescriptions = _.pluck(table.hashes(), 'description');
    var expectedLocations = _.pluck(table.hashes(), 'remoteFile');

    return subscriptions.titles().should.eventually.deep.equal(expectedTitles).then(function() {
      subscriptions.descriptions().should.eventually.deep.equal(expectedDescriptions);
    }).then(function() {
      subscriptions.locations().should.eventually.deep.equal(expectedLocations);
    });
  });

  this.When(/^I view the "([^"]*)" dataset$/, function(title) {
    var _this = this;
    return Promise.delay(1500)
    .then(function() {
      return new _this.Widgets.SubscriptionList().clickOn(title);
    })
  });

  this.Then(/^I should see that I have (\d+) datasets in the overview$/, function(count) {
    return new this.Widgets.SubscriptionOverview().numberOfDataSets().should.eventually.eql(count);
  });

  this.Then(/^I should see a total cost of \$(\d+) in the overview$/, function(cost) {
    return new this.Widgets.SubscriptionOverview().totalCost().should.eventually.eql('$'+cost);
  });

  this.Then(/^I should see the following subscriptions in the overview:$/, function(table) {
    var expectedTitles = _.pluck(table.hashes(), 'title');

    return new this.Widgets.SubscriptionOverview().recentlyUsedTitles().should.eventually.eql(expectedTitles);
  });

  this.Then(/^I should see the "([^"]*)" dataset in the marketplace$/, function(title) {
    return new this.Widgets.MarketItem().title().should.eventually.equal(title);
  });

  this.Then(/^I should be able to unsubscribe$/, function() {
    return new this.Widgets.MarketItem().unsubscribe();
  });

  this.Then(/^I should see the current date for subscription date for "([^"]*)" market item$/, function(title) {
    var d = new Date();
    var currentDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
    return new this.Widgets.SubscriptionList().findDataset(title).then(function(dataset) {
      return dataset.purchaseDate().should.eventually.equal(currentDate);
    });
  });
};
