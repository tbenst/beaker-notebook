module.exports = function() {
  this.Then(/^I should see the edit indicator$/, function() {
    return this.W.isPresent('.admin-action.edit')
    .should.eventually.eql(true);
  });

  this.When(/^I edit a dataset$/, function() {
    return this.W.click('.admin-action.edit');
  });

  this.When(/^I update the dataset name to "([^"]*)"$/, function(newName) {
    return this.W.fill({
      selector: '[ng-model="dataset.title"]',
      value: newName
    })
    .then(function() {
      return this.W.click('.submit-dataset-edit');
    }.bind(this))
    .then(function() {
      // We sleep for 2 seconds to let the network
      // request finish. We have to do this since there is no visible
      // indicator.
      return this.driver.sleep(2000);
    }.bind(this));
  });

  this.When(/^I delete the dataset$/, function() {
    return this.W.click('.delete-dataset')
    .then(function() {
      return this.driver.switchTo().alert();
    }.bind(this))
    .then(function(dialog) {
      return dialog.accept();
    })
    .then(function() {
      // We sleep for 2 seconds to let the network
      // request finish. We have to do this since there is no visible
      // indicator.
      return this.driver.sleep(2000);
    }.bind(this));
  });

  this.Then(/^I should see a dataset with the name "([^"]*)"$/, function(newName) {
    return new this.Widgets.MarketList().invoke({
      method: 'getText',
      arguments: [
        '.title'
      ]
    })
    .should.eventually.eql([newName]);
  })
;

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
};
