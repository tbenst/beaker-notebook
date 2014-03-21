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

  this.Given(/^I'm looking at a project$/, function() {
    var projectData = {name: 'My Project', description: 'desc', ownerId: 1};
    return this.seed('Project', projectData).then(function(projects) {
      this.driver.get(this.route.forProject(projects[0]));
    }.bind(this));
  });

  this.When(/^I edit the project$/, function() {
    return new this.Widgets.ProjectDetail().edit();
  });

  this.When(/^I update the project as follows:$/, function(table) {
    return new this.Widgets.ProjectForm().submitWith(table.hashes()[0]);
  });

  this.Then(/^I should see that the project details are:$/, function(table) {
    var deets = table.hashes()[0];
    var projectDetailWidget = new this.Widgets.ProjectDetail();
    projectDetailWidget.name().should.eventually.equal(deets.name);
    return projectDetailWidget.description().should.eventually.equal(deets.description);
  });
}
