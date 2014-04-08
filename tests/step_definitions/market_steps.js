module.exports = function() {

  this.When(/^there is a market item$/, function(callback) {
    var marketItem = {
      model: 'DataSet',
      data: {
        title: "Credit Card Complaints",
        description: "We don’t verify all the facts alleged in these complaints but we do take steps to confirm a commercial relationship between the consumer and company. Complaints are listed here after the company responds or after they have had the complaint for 15 calendar days, whichever comes first. We remove complaints if they don’t meet all of the publication criteria. Data is refreshed nightly.",
        url: "https://data.consumerfinance.gov/api/views/x3w3-u78g/rows.csv?accessType=DOWNLOAD",
        rows: 350,
        format: "XML",
        updateFrequency: "Weekly"
      }
    };

    return this.seed(marketItem);
  });

  this.When(/^I view the market search$/, function(callback) {
    return this.driver.get(this.route.market);
  });

  this.Then(/^I should see the market item on the market list page$/, function(callback) {
    var marketList = new this.Widgets.MarketList()

    return marketList.items().should.eventually.have.length(1);
  });
}
