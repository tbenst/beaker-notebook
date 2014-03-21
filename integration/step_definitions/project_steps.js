module.exports = function() {

  this.When(/^I create a project$/, function() {
    new this.Widgets.MainNav().visitProjects();
    new this.Widgets.ProjectManager().createNew();
  });

  this.Then(/^I should see a new project in my list$/, function() {
    var projects = new this.Widgets.ProjectManager();
    projects.waitForItem();
    projects.items().should.eventually.have.length(1);
  });

  this.When(/^I open the project$/, function() {
    new this.Widgets.ProjectManager().items().then(function(items) {
      items[0].click();
    });
  });

  this.Then(/^I should see the project detail page$/, function() {
    new this.Widgets.ProjectDetail().isPresent().should.eventually.equal(true);
  });

}
