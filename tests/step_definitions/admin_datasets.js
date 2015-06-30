module.exports = function() {
  this.Then(/^I should see the edit indicator$/, function() {
    return this.W.isPresent('.admin-action.edit')
    .should.eventually.eql(true);
  });

  this.When(/^I edit the "([^"]*)" dataset$/, function(datasetName) {
    return new this.Widgets.MainNav().visitMarketPlace()
    .then(function() {
      return new this.Widgets.MarketTextSearch().setTerm(datasetName);
    }.bind(this))
    .then(function() {
      return this.W.click('.admin-action.edit');
    }.bind(this));
  });

  this.When(/^I edit a dataset$/, function() {
    return this.W.click('.admin-action.edit');
  });

  this.When(/^I set the category to "([^"]*)"$/, function(category) {
    var editor = new this.Widgets.DatasetEditor();

    return editor.setTypeahead('category', category)
    .then(function() {
      return editor.save();
    });
  });

  this.When(/^I enter the dataset name as "([^"]*)"$/, function(newName) {
    return new this.Widgets.DatasetEditor().setTitle(newName);
  });

  this.When(/^I delete the dataset$/, function() {
    return this.W.click('.delete-dataset')
    .then(function() {
      return this.driver.switchTo().alert();
    }.bind(this))
    .then(function(dialog) {
      return dialog.accept();
    });
  });

  this.When(/^I update the dataset$/, function() {
    return new this.Widgets.DatasetEditor().save();
  });

  this.When(/^I enter "([^"]*)" into the category field$/, function(category) {
    return new this.Widgets.DatasetEditor().setTypeahead('category', category);
  });

  this.When(/^I enter "([^"]*)" into the format field$/, function(format) {
    return this.W.fill({
      selector: '.dataset-format-field',
      value: format
    });
  });

  this.When(/^I enter "([^"]*)" into the vendor field$/, function(vendor) {
    return this.W.fill({
      selector: '.dataset-vendor-field',
      value: vendor
    });
  });

  this.When(/^I enter "([^"]*)" into the tags field$/, function(tag) {
    return this.W.fill({
      selector: '.dataset-tags-field',
      value: tag
    });
  });

  this.Then(/^I should see a category autocomplete dropdown with "([^"]*)"$/, function(entry) {
    var list = this.Widget.List.extend({root: '.dataset-category .dropdown-menu'});
    return new list().readAt(0).should.eventually.eql(entry);
  });

  this.Then(/^I should see a format-field autocomplete dropdown with "([^"]*)"$/, function(entry) {
    var list = this.Widget.List.extend({root: '.dataset-format .dropdown-menu'});
    return new list().readAt(0).should.eventually.eql(entry);
  });

  this.Then(/^I should see a vendor-field autocomplete dropdown with "([^"]*)"$/, function(entry) {
    var list = this.Widget.List.extend({root: '.dataset-vendor .dropdown-menu'});
    return new list().readAt(0).should.eventually.eql(entry);
  });

  this.Then(/^I should see a tag-field autocomplete dropdown with "([^"]*)"$/, function(entry) {
    var list = this.Widget.List.extend({root: '.dataset-tags .dropdown-menu'});
    return new list().readAt(0).should.eventually.eql(entry);
  });

  this.Then(/^I should see that the category is invalid$/, function() {
    return new this.Widgets.CategoryField()
    .find()
    .then(function(elm) {
      return elm.getAttribute('class').should.eventually.contain('ng-invalid');
    });
  });

  this.Then(/^I should see the category field is empty$/, function() {
    return new this.Widgets.CategoryField()
    .read()
    .should.eventually.equal('');
  });

  this.Then(/^I click the add button$/, function() {
    return this.W.click('.tag-add');
  });

  this.When(/^type "([^"]*)" into the category field$/, function(val) {
    return new this.Widgets.DatasetEditor().typeInto('category', val);
  });

  this.Then(/^I click the "([^"]*)" tag$/, function(tag) {
    return new this.Widgets.DatasetTags().clickTag(tag);
  });

  this.Then(/^I should see the "([^"]*)" tag$/, function(tag) {
    return new this.Widgets.DatasetTags()
    .contains(tag).should.eventually.be.true;
  });

  this.Then(/^I should not see any tags$/, function() {
    return new this.Widgets.DatasetTags().items().should.eventually.have.length(0);
  });

  this.Then(/^I should see a dataset with the name "([^"]*)"$/, function(newName) {
    return new this.Widgets.MarketList().invoke({
      method: 'getText',
      arguments: [
        '.title'
      ]
    })
    .should.eventually.eql([newName]);
  });

  this.Then(/^I should see the edit the market item indicator$/, function() {
    return (new this.Widgets.MarketItem())
    .canEdit()
    .should.eventually.eql(true);
  });

  this.When(/^I edit the market item from the detail view$/, function() {
    return (new this.Widgets.MarketItem())
    .edit();
  });

  this.Then(/^I should see the dataset editor\.$/, function() {
    return this.W.isPresent('dataset-editor')
    .should.eventually.eql(true);
  });

  this.When(/^I create a new dataset with$/, function(table) {
    var editor = new this.Widgets.DatasetEditor();
    var row = table.hashes()[0];

    //We wait here to ensure the sign in process is complete.
    //Otherwise the call to get route.datasetCreate is sometimes interrupted.
    return this.driver.sleep(1500)
    .then(function() {
      return this.driver.get(this.route.datasetCreate)
    }.bind(this))
    .then(function() {
      return editor.setTitle(row.name);
    })
    .then(function() {
      return editor.addTag(row.tag || "Taggie");
    })
    .then(function() {
      return editor.setCatalog('catalog_0.1');
    })
    .then(function() {
      return editor.setTypeahead('category', row.category);
    })
    .then(function() {
      return editor.setTypeahead('vendor', row.vendor || 'Some vendor');
    })
    .then(function() {
      return editor.save();
    });
  });
};
