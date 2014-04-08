var _         = require("lodash");

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

  this.When(/^I filter by search by select the "([^"]*)" tags$/, function(tags) {
    var marketTagFilter = new this.Widgets.MarketTagFilter;

    return marketTagFilter.selectMatchingTags(tags.split(","));
  });
}
