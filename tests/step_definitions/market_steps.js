var _         = require("lodash");
var bluebird  = require("bluebird");
var assert    = require("assert");

var marketItemBase = function() {
  return _.cloneDeep({
    model: 'DataSet',
    data: {
      title: "Credit Card Complaints",
      description: "We don’t verify all the facts alleged in these complaints but we do take steps to confirm a commercial relationship between the consumer and company. Complaints are listed here after the company responds or after they have had the complaint for 15 calendar days, whichever comes first. We remove complaints if they don’t meet all of the publication criteria. Data is refreshed nightly.",
      remoteFile: "Credit_card_complaints.csv",
      rows: 350,
      format: "XML",
      updateFrequency: "Weekly"
    }
  });
}

module.exports = function() {
  this.When(/^there is a market item$/, function(callback) {
    return this.seed.populate(marketItemBase());
  });

  this.Then(/^I should see the following market results$/, function(table) {
    return new this.Widgets.MarketList().contents().should.eventually.eql(table.hashes());
  });

  this.Then(/^I should see the tags "([^"]*)"$/, function(tags) {
    return bluebird.map([].concat(tags.split(",")), _.bind(function(tag) {
      return (new this.Widgets.MarketItem()).tags().should.eventually.contain(tag);
    }, this));
  });

  this.Then(/^I should see the frequency "([^"]*)"$/, function(frequency) {
    return (new this.Widgets.MarketItem()).frequency().should.eventually.contain(frequency);
  });

  this.Then(/^I should see the format "([^"]*)"$/, function(formats) {
    return (new this.Widgets.MarketItem()).format().should.eventually.contain(formats);
  });

  this.Then(/^I should see the vendor "([^"]*)"$/, function(vendor) {
    return (new this.Widgets.MarketItem()).vendors().should.eventually.contain(vendor.toLowerCase());
  });

  this.Then(/^I should see the market description "([^"]*)"$/, function(description) {
    return (new this.Widgets.MarketItem()).description().should.eventually.equal(description);
  });

  this.Then(/^I should see the related tags "([^"]*)"$/, function(tags) {
    return bluebird.delay(100).then(function() {
      return (new this.Widgets.MarketRelatedTags()).is([].concat(tags.split(",")));
    }.bind(this));
  });

  this.When(/^there is (\d+) market items$/, function(count, callback) {
    var itemSaves = [];
    for(var i = 0; i < +count; ++i) {
      itemSaves.push(this.seed.populate(_.merge(marketItemBase(),{
        data: { title: marketItemBase().data.title + i }})));
    }
    return bluebird.all(itemSaves);
  });

  function seedDataSet(opts) {
    var info = _.defaults(opts, {
      title: marketItemBase().data.title,
      tags: 'test',
      description:  marketItemBase().data.description,
      vendors: '',
      categories: '',
      subscribers: '',
      updateFrequency: marketItemBase().data.updateFrequency,
      dataPreviews: ''
    });

    info.tags     = [].concat(info.tags.split(','));
    info.vendors  = [].concat(info.vendors.split(','));
    info.categories  = [].concat(info.categories.split(','));
    info.subscribers = [].concat(info.subscribers.split(','));
    info.dataPreviews = [].concat(info.dataPreviews.split(','));
    _.pull(info.subscribers, '');
    _.pull(info.categories, '');

    var _this       = this;
    var marketItem  = marketItemBase();

    return this.seed.populate(info.vendors.map(function(vendorName) {
      return {
        model: 'Vendor',
        data: {
          name: vendorName
        }
      }
    }))
    .then(function() {
      return _this.seed.populate(info.tags.map(function(tagName) {
        return {
          model: 'DataTag',
          data: {
            name: tagName
          }
        }
      }))
    })
    .then(function() {
      return _this.seed.populate(info.dataPreviews.map(function(preview) {
        return {
          model: 'DataPreview',
          data: {
            smallPreviewUrl: preview
          }
        }
      }))
    })
    .then(function() {
      marketItem.associations = [{
        joinTable: "data_sets_data_tags",
        lookup: {"DataTag": info.tags.map(function(tagName) { return {name: tagName}; })}
      }, {
        foreignKey: "vendorId",
        lookup: {"Vendor": info.vendors.map(function(vendorName) { return {name: vendorName}; })}
      }, {
        joinTable: "data_sets_data_previews",
        lookup: {"DataPreview": info.dataPreviews.map(function(preview){ return {smallPreviewUrl: preview} ;})}
      }];

      if (info.subscribers.length) {
        marketItem.associations.push({
          joinTable: "data_sets_users",
          lookup: {"User": info.subscribers.map(function(userEmail) { return {email: userEmail}; })}
        });
      }
      if (info.categories.length) {
        marketItem.associations.push({
          joinTable: "data_sets_categories",
          lookup: {"Category": info.categories.map(function(category) {
            return {name: category};
          })}
        });
      }

      delete info.tags;
      delete info.vendors;
      delete info.subscribers;
      delete info.dataPreviews;
      delete info.categories;

      return _this.seed.populate(_.merge(marketItem, {
        data: info
      }));
    });
  }

  this.When(/^there is a market item with the tags "([^"]*)"$/, function(tags) {
    return seedDataSet.call(this, {tags: tags});
  });

  this.Given(/^I have the following market items:$/, function(table, callback) {
    return bluebird.map(table.hashes(), _.bind(seedDataSet, this));
  });

  this.Given(/^I'm subscribed to the following market items:$/, function(table, callback) {
    return bluebird.map(table.hashes(), function(row) {
      return seedDataSet.bind(this, _.merge(row, { subscribers: 'u@r.edu' }))();
    }.bind(this));
  });

  this.When(/^I view the market search$/, function(callback) {
    return this.driver.get(this.route.market);
  });

  this.When(/^I filter the market page by "([^"]*)"$/, function(searchText) {
    var marketFilter = new this.Widgets.MarketFilters;
    return marketFilter.setSearchText(searchText);
  });

  this.Then(/^I should see (\d+) market items? on the market list page$/, function(count) {
    var marketList = new this.Widgets.MarketList()

    return marketList.items().should.eventually.have.length(+count);
  });

  this.When(/^there is a market item with the title "([^"]*)" and the format "([^"]*)"$/, function(title, format, callback) {
    return this.seed.populate(_.merge(marketItemBase(), {
      data: {
        title: title,
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

  this.Then(/^I should see (\d+) total results$/, function(count) {
    var marketSearchPage = new this.Widgets.MarketSearchPage();

    return marketSearchPage.getTotalResults().then(function(v) {
      return assert.equal(+count, v, "Total market page search does not match. \n expected: "+count+"\n got: "+v);
    });
  });

  this.When(/^I view the first market item$/, function(callback) {
    var marketList = new this.Widgets.MarketList();

    return marketList.select(0);
  });

  this.When(/^I return to the list from the market item$/, function(callback) {
    var marketItem = new this.Widgets.MarketItem();

    return marketItem.goBackToSearch();
  });

  this.Then(/^I should see the "([^"]*)" tags selected$/, function(tags, callback) {
    var expected = tags.split(",")
    var marketTagFilter = new this.Widgets.MarketTagFilter;
    return marketTagFilter.getSelectedTags().then(function(observedTags) {
      return assert.deepEqual(observedTags, expected);
    });
  });

  this.Then(/^I should see that no tags are selected$/, function() {
    var marketTagFilter = new this.Widgets.MarketTagFilter;
    return marketTagFilter.getSelectedTags().should.eventually.be.empty;
  });

  this.When(/^there is a market item with the vendor "([^"]*)"$/, function(vendors) {
    return seedDataSet.call(this, {vendors: vendors});
  });

  this.When(/^I filter by search by selecting the "([^"]*)" vendors$/, function(vendors, callback) {
    var marketVendorFilter = new this.Widgets.MarketVendorFilter;

    return marketVendorFilter.selectMatching(vendors.split(","));
  });

  this.When(/^I search the top-level marketplace for "([^"]*)"$/, function(term) {
    return new this.Widgets.MarketSidebar().search(term);
  });

  this.When(/^I search the marketplace in the filters for "([^"]*)"$/, function(term) {
    var marketTextSearch = new this.Widgets.MarketTextSearch;
    return marketTextSearch.setTerm(term);
  });

  this.Then(/^I should see the "([^"]*)" market item on the market list page$/, function(title) {
    var marketList = new this.Widgets.MarketList()
    return marketList.contains(title).should.eventually.be.true;
  });

  this.When(/^I view the "([^"]*)" market item$/, function(title) {
    var marketList = new this.Widgets.MarketList();
    return marketList.clickItem(title);
  });

  this.Then(/^I should see "([^"]*)" is related$/, function(title) {
    var relatedItems = new this.Widgets.RelatedItems;
    return relatedItems.itemTitle(0).should.eventually.equal(title);
  });

  this.When(/^I view the "([^"]*)" related item$/, function(title) {
    var relatedItems = new this.Widgets.RelatedItems;
    return relatedItems.clickItem(title);
  });

  this.Then(/^I should see no related items$/, function() {
    return new this.Widgets.RelatedItems().items().should.eventually.have.length(0);
  });

  this.Then(/^I should see "([^"]*)" related items$/, function(count) {
    return new this.Widgets.RelatedItems().getCount()
    .should.eventually.eql(+count);
  });

  this.When(/^I subscribe to the market item$/, function() {
    return new this.Widgets.MarketItem().subscribe();
  });

  this.Then(/^I should see the file path "([^"]*)"$/, function(path) {
    return (new this.Widgets.MarketItem()).filePath().should.eventually.equal(path)
  });

  this.Given(/^I have the following categories:$/, function(table) {
    var seedData = _.map(table.hashes(), function(item) {
      return {
        model: 'Category',
        data: item
      }
    });
    return this.seed.populate(seedData);
  });

  this.When(/^I click "([^"]*)"$/, function(category) {
    var marketCategory = new this.Widgets.MarketCategory();
    return marketCategory.clickCategory(category);
  });

  this.Then(/^I should see that no category is selected$/, function() {
    var marketCategory = new this.Widgets.MarketCategory();
    return marketCategory.selectedCategoryCount().should.eventually.equal(0);
  });

  this.Then(/^I should see a category description$/, function() {
    var marketCategoryHero = new this.Widgets.MarketCategoryHero();
    return marketCategoryHero.isPresent().should.eventually.equal(true);
  });

  this.Then(/^I should not see a category description$/, function() {
    var marketCategoryHero = new this.Widgets.MarketCategoryHero();
    return marketCategoryHero.isPresent().should.eventually.equal(false);
  });

  this.Then(/^I should see "([^"]*)" format(s)?$/, function(formats) {
    var filter = new this.Widgets.MarketFormatFilter;
    var expected = formats.split(",");
    return filter.getItemNames().should.eventually.deep.equal(expected);
  });

  this.Then(/^I should see "([^"]*)" vendor(s)?$/, function(vendors) {
    var filter = new this.Widgets.MarketVendorFilter;
    var expected = vendors.split(",");
    return filter.getItemNames().should.eventually.deep.equal(expected);
  });

  this.Then(/^I should see an active tab of "([^"]*)"$/, function(tabName) {
    return (new this.Widgets.MarketItem()).activeTab().should.eventually.equal(tabName)
  });

  this.When(/^I have a market item with only a thumbnail$/, function() {
    return seedDataSet.call(this, {title: "Thumbnail Preview", dataPreviews: "http://placehold.it/100x101"});
  });

  this.When(/^I have a market item with a csv preview and a thumbnail$/, function() {
    return seedDataSet.call(this, {title: "Thumbnail and CSV", dataPreviews: "http://placehold.it/100x101", numColumns: 5, csvPreview: "one,two,three\n1,2,3"});
  });

  this.Then(/^I should see (\d+) tab(s*)$/, function(tabCount) {
    var tabList = new this.Widgets.TabList()
    return  tabList.items().should.eventually.have.length(tabCount);
  });

  this.When(/^I click the "([^"]*)" tab$/, function(tab) {
    var tabList = new this.Widgets.TabList()
    return tabList.clickTab(tab);
  });

  this.When(/^I have a market item with no csv preview and no thumbnail$/, function() {
    return this.seed.populate(_.merge(marketItemBase(), {
      data: {
        title: "Sans Previews"
      }
    }));
  });

  this.Then(/^I should not see any previews$/, function() {
    var dataPreview = new this.Widget({
      root: '.data-previews'
    });
    return dataPreview.isPresent().should.eventually.equal(false);
  });

  this.When(/^I search marketplace by the data set's vendor$/, function(title) {
    return new this.Widgets.MarketItem().clickVendor();
  });

  this.When(/^I browse marketplace by category "([^"]*)"$/, function(category) {
    var marketCategory = new this.Widgets.MarketCategory();
    return marketCategory.clickCategory(category);
  });

  this.When(/^I filter marketplace by vendor "([^"]*)"$/, function(vendor) {
    var marketVendorFilter = new this.Widgets.MarketVendorFilter;
    return marketVendorFilter.selectMatching(vendor.split(","));
  });

  this.Then(/^I should see (\d+) items in the "([^"]*)" category count$/, function(count, category) {
    var marketCategory = new this.Widgets.MarketCategory();
    return marketCategory.categoryCount(category).should.eventually.equal(count);
  });

  this.Then(/^I should see the category "([^"]*)"$/, function(category) {
    return (new this.Widgets.MarketItem()).categories().should.eventually.equal(category);
  });

  this.Then(/^I should see the category owner "([^"]*)"$/, function(name) {
    var marketCategoryHero = new this.Widgets.MarketCategoryHero();
    return marketCategoryHero.owner().should.eventually.equal(name);
  });

  this.Then(/^I should see the category description "([^"]*)"$/, function(desc) {
    var marketCategoryHero = new this.Widgets.MarketCategoryHero();
    return marketCategoryHero.description().should.eventually.equal(desc);
  });

  this.Then(/^I should see the start date "([^"]*)"$/, function(date) {
    return (new this.Widgets.MarketItem()).startDate().should.eventually.equal(date)
  });
}
