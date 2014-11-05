var expect = require('chai').expect;

module.exports = function() {
  this.Then(/^I should see the following user:$/, function(table) {
    return new this.Widgets.EditUserForm().contents().then(function(contents) {
      return expect(contents).to.eql(table.hashes()[0]);
    });
  });
};
