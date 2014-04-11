var _         = require("lodash");
var bluebird  = require("bluebird");
var assert    = require("assert");

var marketItemBase = function() {
  return _.cloneDeep({
    model: 'DataSet',
    data: {
      title: "Credit Card Complaints",
      description: "We don’t verify all the facts alleged in these complaints but we do take steps to confirm a commercial relationship between the consumer and company. Complaints are listed here after the company responds or after they have had the complaint for 15 calendar days, whichever comes first. We remove complaints if they don’t meet all of the publication criteria. Data is refreshed nightly.",
      url: "https://data.consumerfinance.gov/api/views/x3w3-u78g/rows.csv?accessType=DOWNLOAD",
      rows: 350,
      format: "XML",
      updateFrequency: "Weekly"
    }
  });
}

module.exports = function() {
  this.When(/^there is a market item$/, function(callback) {
    return this.seed(marketItemBase());
  });

  this.When(/^there is "([^"]*)" market items$/, function(count, callback) {
    var itemSaves = [];
    for(var i = 0; i < +count; ++i) {
      itemSaves.push(this.seed(marketItemBase()));
    }

    return bluebird.all(itemSaves);
  });

  this.When(/^there is a market item with the tags "([^"]*)"$/, function(tags, callback) {
    var tagNames    = [].concat(tags.split(","));
    var _this       = this;
    var marketItem  = marketItemBase();

    return this.seed(tagNames.map(function(tagName) {
      return {
        model: 'DataTag',
        data: {
          name: tagName
        }
      }
    }))
    .then(function() {
      marketItem.associations = [{
        joinTable: "DataSetsDataTags",
        lookup: {"DataTag": tagNames.map(function(tagName) { return {name: tagName}; })}
      }];

      return _this.seed(marketItem);
    });
  });

  this.When(/^I view the market search$/, function(callback) {
    return this.driver.get(this.route.market);
  });

  this.When(/^I filter the market page by "([^"]*)"$/, function(searchText) {
    var marketFilter = new this.Widgets.MarketFilters;
    return marketFilter.setSearchText(searchText);
  });

  this.Then(/^I should see "([^"]*)" market item on the market list page$/, function(count) {
    var marketList = new this.Widgets.MarketList()

    return marketList.items().should.eventually.have.length(+count);
  });

  this.When(/^there is a market item with the format "([^"]*)"$/, function(format, callback) {
    return this.seed(_.merge(marketItemBase(), {
      data: {
        format: format
      }
    }));
  });

  this.When(/^I filter by search by selecting the "([^"]*)" formats$/, function(formats, callback) {
    var marketTagFilter = new this.Widgets.MarketFormatFilter;

    return marketTagFilter.selectMatching(formats.split(","));
  });

  this.When(/^I filter by search by selecting the "([^"]*)" tags$/, function(tags) {
    var marketTagFilter = new this.Widgets.MarketTagFilter;

    return marketTagFilter.selectMatching(tags.split(","));
  });

  this.Then(/^I should see "([^"]*)" total results$/, function(count) {
    var marketSearchPage = new this.Widgets.MarketSearchPage();

    return marketSearchPage.getTotalResults().then(function(v) {
      return assert.equal(+count, v, "Total market page search does not match. \n expected: "+count+"\n got: "+v);
    });
  });

  this.When(/^I view the first market item$/, function(callback) {
    var marketList = new this.Widgets.MarketList();

    return marketList.select(0);
  });

  this.When(/^I return to the market results$/, function(callback) {
    var marketItem = new this.Widgets.MarketItem();

    return marketItem.goBackToSearch();
  });

  this.Then(/^I should see the "([^"]*)" tags selected$/, function(tags, callback) {
    var marketTagFilter = new this.Widgets.MarketTagFilter;

    return marketTagFilter.getSelectedTags().then(function(selectedTags) {
      assert.equal(tags.split(",").length, selectedTags.length);
    });
  });

  this.When(/^there is a market item with the vendor "([^"]*)"$/, function(vendors, callback) {
    var vendorNames = [].concat(vendors.split(","));
    var _this       = this;
    var marketItem  = marketItemBase();

    return this.seed(vendorNames.map(function(vendorName) {
      return {
        model: 'Vendor',
        data: {
          name: vendorName
        }
      }
    }))
    .then(function() {
      marketItem.associations = [{
        foreignKey: "vendorId",
        lookup: {"Vendor": vendorNames.map(function(vendorName) { return {name: vendorName}; })}
      }];

      return _this.seed(marketItem);
    });
  });

  this.When(/^I filter by search by selecting the "([^"]*)" vendors$/, function(vendors, callback) {
    var marketVendorFilter = new this.Widgets.MarketVendorFilter;

    return marketVendorFilter.selectMatching(vendors.split(","));
  });
}
