module.exports = function() {
  this.Then(/^I should see the edit indicator$/, function() {
    return this.W.isPresent('.admin-action.edit')
    .should.eventually.eql(true);
  });
};
