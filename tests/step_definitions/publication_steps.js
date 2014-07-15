var moment = require('moment');

module.exports = function() {
  this.When(/^I go to publish the notebook$/, function() {
    return new this.Widgets.Notebook().openPublishModal();
  });

  this.When(/^I give it the description "([^"]*)"$/, function(description) {
    return new this.Widgets.PublishModal().addDescription(description)
  });

  this.When(/^I publish the notebook$/, function() {
    return new this.Widgets.PublishModal().publish();
  });

  this.When(/^I view the published version$/, function() {
    return new this.Widgets.Notebook().viewPublished();
  });

  this.Then(/^I should see a published version of the following notebook:$/, function(table) {
    var attrs = table.hashes()[0];
    var publication = new this.Widgets.Publication();

    return publication.name().should.eventually.eql(attrs.name)
    .then(function() {
      return publication.description().should.eventually.eql(attrs.description);
    })
  });
}
