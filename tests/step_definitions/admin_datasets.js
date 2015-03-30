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
;};
