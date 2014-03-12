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

}
