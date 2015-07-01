var _         = require('lodash');
var bluebird  = require('bluebird');
var assert    = require('assert');
var config    = require('../util/_config');
var base      = config.bunsenUrl + 'api/seed';

var DEFAULT_INDEX = 'catalog_0.1';

var marketItemBase = function() {
  var base = _.cloneDeep({
    //jscs:disable
    description: 'We don’t verify all the facts alleged in these complaints but we do take steps to confirm a commercial relationship between the consumer and company. Complaints are listed here after the company responds or after they have had the complaint for 15 calendar days, whichever comes first. We remove complaints if they don’t meet all of the publication criteria. Data is refreshed nightly.',
    //jscs:enable
    remoteFile: 'Credit_card_complaints.csv',
    rows: 350,
    updateFrequency: 'Weekly',
    vendor: 'Some vendor',
    tags: ['one'],
    categoryIds: ['categories_default']
  });
  base.title = 'Credit Card Complaints ' + Math.random();
  return base;
};

var twoSigmaCatalog = {
  title: {type: 'string', indexes: ['text']},
  description: {type: 'string', indexes: ['text']},
  remoteFile: {type: 'string'},
  rows: {type: 'integer'},
  format: {type: 'string', indexes: ['filter']},
  updateFrequency: {type: 'string'},
  startDate: {type: 'date'},
  numColumns: {type: 'integer'},
  csvPreview: {type: 'string'},
  vendor: {type: 'string', indexes: ['filter']},
  tags: {type: 'string', indexes: ['filter']}
};

var quandlCatalog = {
  name: {type: 'string', indexes: ['text']},
  about: {type: 'string', indexes: ['text']},
  type: {type: 'string', indexes: ['filter']},
  company: {type: 'string', indexes: ['filter']},
};

function seedDataSets(datasets, indexName) {
  indexName = indexName || DEFAULT_INDEX;
  var _this = this;
  var setsWithDefaults = bluebird.map(datasets, function(set) {
    var transformed = _.omit(set, ['categories', 'tags']);
    transformed = _.extend(transformed, {'catalog': _this.currentCatalogs[indexName]['public-id'],
                                         'categoryId': _this.currentCategories[indexName]['public-id'],
                                         'categoryIds': [_this.currentCategories[indexName]['public-id']]});
    if (set.tags) {
      transformed.tags = set.tags.split(',');
    }
    if (set.categories) {
      transformed.categoryId = _this.currentCategories[set.categories]['public-id'];
      transformed.categoryIds.push(transformed.categoryId);
    }
    return _.merge(marketItemBase(), transformed);
  });

  return this.marketplace.createDatasets(indexName, setsWithDefaults);
}

function createIndexCatalogCategory(name, mapping) {
  var _this = this;

  return this.marketplace.createIndex(name)
  .then(function() {
    return _this.marketplace.createCatalog({name: name, mapping: mapping, 'base-path': '/var/s3/'})
    .then(function(catalog) {
      _this.currentCatalogs = _this.currentCatalogs || {};
      _this.currentCatalogs[name] = catalog;
      return catalog;
    })
    .then(function() {
      var attrs = {'name': name,
                   'catalog-id': _this.currentCatalogs[name]['public-id']};
      return _this.marketplace.createCategory(attrs)
      .then(function(category) {
        _this.currentCategories = _this.currentCategories || {};
        _this.currentCategories[category.name] = category;
        return category;
      });
    });
  });
}

module.exports = function() {

  this.Given(/^I have a default catalog$/, function() {
    return createIndexCatalogCategory.call(this, DEFAULT_INDEX, twoSigmaCatalog);
  });

  this.Given(/^I have Two Sigma catalog$/, function() {
    return createIndexCatalogCategory.call(this, 'two_sigma', twoSigmaCatalog);
  });

  this.Given(/^I have Quandl catalog$/, function() {
    return createIndexCatalogCategory.call(this, 'quandl', quandlCatalog);
  });

  this.Given(/^I have a default vendor$/, function(callback) {
    return this.marketplace.createVendors([{
      'name': 'Some vendor',
      'public-id': '55705cd9-f788-4a57-aa5d-1b271acd59cb'
    }]);
  });

  this.When(/^there is a market item$/, function(callback) {
    return seedDataSets.call(this, [{}]);
  });

  this.When(/^there is (\d+) market items$/, function(count, callback) {
    var itemSaves = [];
    for (var i = 0; i < +count; ++i) {
      var item = {title: marketItemBase().title + i};
      itemSaves.push(item);
    }
    return seedDataSets.call(this, itemSaves);
  });

  this.When(/^there is a market item with the tags "([^"]*)"$/, function(tags) {
    return seedDataSets.call(this, [{tags: tags}]);
  });

  this.When(/^there is a market item with the title "([^"]*)" and the format "([^"]*)"$/, function(title, format, callback) {
    return seedDataSets.call(this, [{title: title, format: format}]);
  });

  this.When(/^there is a market item with the vendor "([^"]*)"$/, function(vendor) {
    return seedDataSets.call(this, [{vendor: vendor}]);
  });

  this.Given(/^index "([^"]*)" has the following market items:$/, function(indexName, table, callback) {
    return seedDataSets.call(this, table.hashes(), indexName);
  });

  this.Given(/^I have the following market items:$/, function(table, callback) {
    return seedDataSets.call(this, table.hashes());
  });

  this.Given(/^I'm subscribed to the following market items:$/, function(table, callback) {
    var _this = this;
    return seedDataSets.call(_this, table.hashes()).then(function() {
      return bluebird.reduce(table.hashes(), function(__, row) {
        return new _this.Widgets.MainNav().visitDatasets()
          .then(function() {
            return new _this.Widgets.MainNav().visitMarketPlace();
          })
          .then(function() {
            return new _this.Widgets.MarketList().clickItem(row.title);
          })
          .then(function() {
            return new _this.Widgets.MarketItem().subscribe();
          });
      }, null);
    });
  });

  this.When(/^I have a market item with only a thumbnail$/, function() {
    return seedDataSets.call(this, [{dataPreviews: 'http://placehold.it/100x101', title: 'Thumbnail Preview'}]);
  });

  this.When(/^I have a market item with a csv preview and a thumbnail$/, function() {
    return seedDataSets.call(this, [{dataPreviews: 'http://placehold.it/100x101', title: 'Thumbnail and CSV', numColumns: 5, csvPreview: 'one,two,three\n1,2,3'}]);
  });

  this.When(/^I have a market item with no csv preview and no thumbnail$/, function() {
    return seedDataSets.call(this, [{title: 'Sans Previews'}]);
  });

  this.Then(/^I should see the following market results$/, function(table) {
    return new this.Widgets.MarketList().contents().then(function(content) {
      return content[0].should.eql(table.hashes()[0]);
    });
  });

  this.Then(/^I should see the tags "([^"]*)"$/, function(tags) {
    return bluebird.map([].concat(tags.split(',')), _.bind(function(tag) {
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
      return (new this.Widgets.MarketRelatedTags()).is([].concat(tags.split(',')));
    }.bind(this));
  });

  this.When(/^I view the market search$/, function(callback) {
    return new this.Widgets.MainNav().visitMarketPlace();
  });

  this.When(/^I filter the market page by "([^"]*)"$/, function(searchText) {
    return new this.Widgets.MarketTextSearch().setTerm(searchText);
  });

  this.Then(/^I should see (\d+) market items? on the market list page$/, function(count) {
    var marketList = new this.Widgets.MarketList();
    return marketList.items().should.eventually.have.length(+count);
  });

  this.When(/^I filter by search by selecting the "([^"]*)" formats$/, function(formats, callback) {
    var marketTagFilter = new this.Widgets.MarketFormatFilter();

    return marketTagFilter.selectMatching(formats.split(','));
  });

  this.When(/^I filter by search by selecting the "([^"]*)" tags$/, function(tags) {
    var marketTagFilter = new this.Widgets.MarketTagFilter();

    return marketTagFilter.selectMatching(tags.split(','));
  });

  this.Then(/^I should see (\d+) total results$/, function(count) {
    var marketSearchPage = new this.Widgets.MarketSearchPage();

    return marketSearchPage.getTotalResults().then(function(v) {
      return assert.equal(+count, v, 'Total market page search does not match. \n expected: ' + count + '\n got: ' + v);
    });
  });

  this.When(/^I view the first market item$/, function() {
    var marketList = new this.Widgets.MarketList();
    return marketList.select(0);
  });

  this.When(/^I return to the list from the market item$/, function(callback) {
    var marketItem = new this.Widgets.MarketItem();

    return marketItem.goBackToSearch();
  });

  this.Then(/^I should see the "([^"]*)" tags selected$/, function(tags, callback) {
    var expected = tags.split(',');
    return new this.Widgets.MarketTagFilter().getSelected().should.eventually.eql(expected);
  });

  this.Then(/^I should see that no tags are selected$/, function() {
    var marketTagFilter = new this.Widgets.MarketTagFilter();
    return marketTagFilter.getSelected().should.eventually.be.empty;
  });

  this.When(/^I filter by search by selecting the "([^"]*)" vendors$/, function(vendors, callback) {
    var marketVendorFilter = new this.Widgets.MarketVendorFilter();

    return marketVendorFilter.selectMatching(vendors.split(','));
  });

  this.When(/^I search the top-level marketplace for "([^"]*)"$/, function(term) {
    return new this.Widgets.MarketSidebar().search(term);
  });

  this.When(/^I search the marketplace in the filters for "([^"]*)"$/, function(term) {
    var marketTextSearch = new this.Widgets.MarketTextSearch();
    return marketTextSearch.setTerm(term);
  });

  this.When(/^I clear the marketplace search$/, function() {
    return new this.Widgets.MarketTextSearch().clearSearch();
  });

  this.Then(/^I should see the "([^"]*)" market item on the market list page$/, function(title) {
    return new this.Widgets.MarketList().contains(title);
  });

  this.When(/^I follow the related tag "([^"]*)"$/, function(tag) {
    return new this.Widgets.MarketRelatedTags().click({text: tag});
  });

  this.When(/^I view the "([^"]*)" market item$/, function(title) {
    var marketList = new this.Widgets.MarketList();
    return bluebird.delay(1500)
    .then(function() {
      return marketList.clickItem(title);
    });
  });

  this.Then(/^I should see "([^"]*)" is related$/, function(title) {
    var relatedItems = new this.Widgets.RelatedItems();
    return relatedItems.itemTitle(0).should.eventually.equal(title);
  });

  this.When(/^I view the "([^"]*)" related item$/, function(title) {
    var relatedItems = new this.Widgets.RelatedItems();
    return relatedItems.clickItem(title);
  });

  this.Then(/^I should see no related items$/, function() {
    return new this.Widgets.RelatedItems().length().should.eventually.equal(0);
  });

  this.Then(/^I should see "([^"]*)" related items$/, function(count) {
    return new this.Widgets.RelatedItems().length()
    .should.eventually.eql(+count);
  });

  this.When(/^I subscribe to the market item$/, function() {
    return new this.Widgets.MarketItem().subscribe();
  });

  this.Then(/^I should see the file path "([^"]*)"$/, function(path) {
    return (new this.Widgets.MarketItem()).filePath().should.eventually.equal(path);
  });

  this.Given(/^I have the following categories:$/, function(table) {
    var _this = this;

    return bluebird.map(table.hashes(), function(category) {
      var attrs = {'catalog-id': _this.currentCatalogs[DEFAULT_INDEX]['public-id'],
                   'parent-id': _this.currentCategories[category.parent]['public-id']};
      attrs = _.extend(category, attrs);

      return _this.marketplace.createCategory(attrs)
      .then(function(category) {
        _this.currentCategories = _this.currentCategories || {};
        _this.currentCategories[category.name] = category;
        return category;
      });
    });
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
    var filter = new this.Widgets.MarketFormatFilter();
    var expected = formats.split(',');
    return filter.getItemNames().should.eventually.deep.equal(expected);
  });

  this.Then(/^I should see "([^"]*)" vendor(s)?$/, function(vendors) {
    var filter = new this.Widgets.MarketVendorFilter();
    var expected = vendors.split(',');
    return filter.getItemNames().should.eventually.deep.equal(expected);
  });

  this.Then(/^I should see an active tab of "([^"]*)"$/, function(tabName) {
    return (new this.Widgets.MarketItem()).activeTab().should.eventually.equal(tabName);
  });

  this.Then(/^I should see (\d+) tab(s*)$/, function(tabCount) {
    var tabList = new this.Widgets.TabList();
    return tabList.items().should.eventually.have.length(tabCount);
  });

  this.When(/^I click the "([^"]*)" tab$/, function(tab) {
    return new this.Widgets.TabList().clickTab(tab);
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

  this.When(/^I browse the default catalog by category "([^"]*)"$/, function(category) {
    var _this = this;
    var marketCategory = new this.Widgets.MarketCategory();
    return bluebird.delay(1500)
    .then(function() {
      return marketCategory.clickCategory(category);
    });
  });

  this.When(/^I browse "([^"]*)" catalog$/, function(catalog) {
    var marketCategory = new this.Widgets.MarketCategory();
    return bluebird.delay(1500)
    .then(function() {
      return marketCategory.clickCategory(catalog);
    });
  });

  this.Then(/^I should be in "([^"]*)" catalog$/, function(catalog) {
    var marketCategory = new this.Widgets.MarketCategory();
    return marketCategory.selected().should.eventually.equal(catalog.toUpperCase());
  });

  this.Then(/^I shouldn't see "([^"]*)" field listed on the market list page$/, function(field) {
    return new this.Widgets.MarketList().getText().should.not.eventually.include(field);
  });

  this.Then(/^I should see the following filters:$/, function(table) {
    var _this = this;
    return bluebird.map(table.hashes(), function(row) {
      var filter = new _this.Widgets.MarketFilter(row.filter);
      var expected = row.values.split(',');
      return filter.getItemNames().should.eventually.deep.equal(expected);
    });
  });

  this.When(/^I open the marketplace category "([^"]*)"$/, function(category) {
    return new this.Widgets.MarketCategory().clickCategory(category);
  });

  this.When(/^I filter marketplace by vendor "([^"]*)"$/, function(vendor) {
    return new this.Widgets.MarketVendorFilter().selectMatching(vendor.split(','));
  });

  this.Then(/^I should see (\d+) items in the "([^"]*)" category count$/, function(count, category) {
    var marketCategory = new this.Widgets.MarketCategory();
    return marketCategory.categoryCount(category).should.eventually.equal(count);
  });

  this.Then(/^I should see the following categories in the navigation:$/, function(table) {
    return new this.Widgets.MarketCategory().allCategories().then(function(categories) {
      var intersection = _.intersection(categories, _.pluck(table.hashes(), 'name'));
      return intersection.length.should.equal(table.hashes().length);
    });
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
    return (new this.Widgets.MarketItem()).startDate().should.eventually.equal(date);
  });

  this.Then(/^I give the market item a rating of (\d+)$/, function(index) {
    return new this.Widgets.UserRating({root: '.rating'}).clickStar(index);
  });

  this.Then(/^I should see (\d+) stars highlighted in my rate$/, function(count) {
    return new this.Widgets.UserRating({root: '.rating'}).currentRating().should.eventually.have.length(count);
  });

  this.Then(/^I should see (\d+) stars highlighted in the average$/, function(count) {
    return new this.Widgets.UserRating({root: '.average'}).currentRating().should.eventually.have.length(count);
  });

  this.Then(/^I should not see the user rating$/, function() {
    return new this.Widgets.UserRating({root: '.rating'}).isPresent().should.eventually.equal(false);
  });

  this.Then(/^I should see an average rating of (\d+) for the first market item$/, function(avg) {
    return new this.Widgets.UserRating({root: '.average'}).currentRating().should.eventually.have.length(avg);
  });
};
